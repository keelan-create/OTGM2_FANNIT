from pathlib import Path
import re


ROOT = Path("/home/ubuntu/otgm-github-current")
BLOG_DATA = ROOT / "lib/blogData.ts"
BLOG_POSTS = ROOT / "lib/blogPosts.ts"
SITEMAP = ROOT / "public/sitemap.xml"
LLMS = ROOT / "public/llms.txt"
BELLEVUE_DRAFT = Path("/home/ubuntu/bellevue_article_research/bellevue_moving_estimate_article_draft.md")
REDMOND_DRAFT = Path("/home/ubuntu/redmond_article_research/redmond_move_day_planning_article_draft.md")


ARTICLES = [
    {
        "slug": "bellevue-moving-estimate-checklist",
        "title": "Bellevue Moving Estimate Checklist: How to Get a More Accurate Quote",
        "meta_title": "Bellevue Moving Estimate Checklist: Get a Better Quote | On The Go Moving",
        "meta_description": "Getting moving quotes in Bellevue? Use this practical checklist to explain your inventory, building access, services, and timeline so your estimate reflects the move you are actually planning.",
        "date": "August 18, 2026",
        "date_iso": "2026-08-18",
        "category": "Moving Tips & Guides",
        "read_time": "12 min read",
        "author": "On The Go Moving",
        "image_key": "crewCarryingOut",
        "related_service": "Residential Moving",
        "related_service_href": "/residential-moving/",
        "draft": BELLEVUE_DRAFT,
        "section_headers": [
            "Start With the Basic Move Details",
            "Make Your Inventory Easy to Understand",
            "Explain Access at Both Addresses",
            "Decide Which Services Need to Be Included",
            "Talk Through Timing and Move-Day Constraints",
            "Compare Estimates by Scope, Not Only by the Total",
            "Confirm the Plan Before Move Day",
        ],
        "llms_description": "A Bellevue quote-preparation checklist covering inventory, building access, services, and timing so a local moving estimate reflects the planned move.",
    },
    {
        "slug": "redmond-move-day-planning-checklist",
        "title": "Redmond Moving Checklist: Parking, Loading Access, and Move-Day Planning",
        "meta_title": "Redmond Moving Checklist: Parking, Access, and Move Day | On The Go Moving",
        "meta_description": "Moving in or out of Redmond? Use this practical checklist to coordinate parking, building entry, loading access, packing, and the final move-day plan before the crew arrives.",
        "date": "August 20, 2026",
        "date_iso": "2026-08-20",
        "category": "Moving Tips & Guides",
        "read_time": "11 min read",
        "author": "On The Go Moving",
        "image_key": "crewEntryway4",
        "related_service": "Residential Moving",
        "related_service_href": "/residential-moving/",
        "draft": REDMOND_DRAFT,
        "section_headers": [
            "Build a One-Page Move-Day Plan",
            "Confirm Parking and Truck Access",
            "Coordinate Building Entry, Elevators, and Loading Areas",
            "Finish Packing and Protect the Essentials",
            "Prepare the Old Home for an Efficient Departure",
            "Set Up the Arrival Plan at the New Home",
            "Run a Final 24-Hour Confirmation",
        ],
        "llms_description": "A Redmond move-day checklist for coordinating legal parking, building entry, loading access, packed essentials, and arrival instructions.",
    },
]


def read_article_copy(path: Path):
    content = path.read_text(encoding="utf-8")
    try:
        return content.split("## Article Copy\n", 1)[1].split("\n## Implementation Notes", 1)[0]
    except IndexError as error:
        raise ValueError(f"Article copy markers were not found in {path}") from error


def clean(value: str):
    return value.strip()


def template(value: str):
    return clean(value).replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def extract_intro(article_copy: str):
    match = re.search(r"\*\*Intro\*\*\n\n(.*?)(?=\n## )", article_copy, re.S)
    if not match:
        raise ValueError("Could not extract the article intro")
    return clean(match.group(1))


def extract_section(article_copy: str, heading: str):
    escaped_heading = re.escape(heading)
    match = re.search(rf"^## {escaped_heading}\n\n(.*?)(?=\n## |\Z)", article_copy, re.M | re.S)
    if not match:
        raise ValueError(f"Could not extract section: {heading}")
    return clean(match.group(1))


def extract_faqs(article_copy: str):
    match = re.search(r"^## Frequently Asked Questions\n\n(.*)$", article_copy, re.M | re.S)
    if not match:
        raise ValueError("Could not locate the FAQ section")
    faqs = []
    for question, answer in re.findall(r"^### (.+?)\n\n(.*?)(?=\n### |\Z)", match.group(1), re.M | re.S):
        faqs.append((clean(question), clean(answer)))
    if len(faqs) != 6:
        raise ValueError(f"Expected six FAQs, found {len(faqs)}")
    return faqs


def article_record(article):
    copy = read_article_copy(article["draft"])
    sections = [
        f'''      {{
        type: "h2",
        heading: `{template(heading)}`,
        body: `{template(extract_section(copy, heading))}`
      }}'''
        for heading in article["section_headers"]
    ]
    faqs = [
        f'''      {{
        q: `{template(question)}`,
        a: `{template(answer)}`
      }}'''
        for question, answer in extract_faqs(copy)
    ]
    return f'''  "{article["slug"]}": {{
    slug: "{article["slug"]}",
    title: `{template(article["title"])}`,
    metaTitle: `{template(article["meta_title"])}`,
    metaDescription: `{template(article["meta_description"])}`,
    date: "{article["date"]}",
    dateISO: "{article["date_iso"]}",
    category: "{article["category"]}",
    readTime: "{article["read_time"]}",
    author: "{article["author"]}",
    heroImage: BRAND_IMAGES.{article["image_key"]},
    intro: `{template(extract_intro(copy))}`,
    relatedService: "{article["related_service"]}",
    relatedServiceHref: "{article["related_service_href"]}",
    sections: [
{",\n".join(sections)}
    ],
    faqs: [
{",\n".join(faqs)}
    ]
  }}'''


def index_record(article):
    copy = read_article_copy(article["draft"])
    intro = re.sub(r"<[^>]+>", "", extract_intro(copy)).replace("\n", " ")
    excerpt = " ".join(intro.split())
    if len(excerpt) > 220:
        excerpt = excerpt[:217].rsplit(" ", 1)[0] + "..."
    return f'''  {{
    slug: "{article["slug"]}",
    title: `{template(article["title"])}`,
    excerpt: `{template(excerpt)}`,
    image: BRAND_IMAGES.{article["image_key"]},
    date: "{article["date"]}",
    category: "{article["category"]}",
    readTime: "{article["read_time"]}",
  }},
'''


def ensure_absent(content: str, slug: str, file_name: str):
    if slug in content:
        raise ValueError(f"{slug} is already present in {file_name}; no changes were made")


blog_data = BLOG_DATA.read_text(encoding="utf-8")
blog_posts = BLOG_POSTS.read_text(encoding="utf-8")
sitemap = SITEMAP.read_text(encoding="utf-8")
llms = LLMS.read_text(encoding="utf-8")

for article in ARTICLES:
    ensure_absent(blog_data, article["slug"], "blogData.ts")
    ensure_absent(blog_posts, article["slug"], "blogPosts.ts")
    ensure_absent(sitemap, article["slug"], "sitemap.xml")
    ensure_absent(llms, article["slug"], "llms.txt")

bellevue_donor = "Ask specifically about the items most likely to apply to your move. If you live in a building with stairs and no elevator, ask about stair charges before you commit."
bellevue_replacement = (
    bellevue_donor
    + ' If you are planning a local move in Bellevue, use our <a href="/bellevue-moving-estimate-checklist/">Bellevue moving estimate checklist</a> to gather the inventory, building-access, and timing details that make a quote easier to compare.'
)
if blog_data.count(bellevue_donor) != 1:
    raise ValueError("Expected exactly one Bellevue backward-link donor sentence")
blog_data = blog_data.replace(bellevue_donor, bellevue_replacement, 1)

redmond_donor = 'Planning your move? Our <a href="/moving-timeline-for-home-buyers/">home buyer moving timeline</a> and <a href="/moving-out-after-selling-your-home/">home seller moving checklist</a> cover every step of the process.'
redmond_replacement = (
    redmond_donor
    + ' For a final parking, access, and arrival review, use our <a href="/redmond-move-day-planning-checklist/">Redmond move-day planning checklist</a> before the truck arrives.'
)
redmond_record_start = blog_data.find('  "moving-to-redmond": {')
redmond_record_end = blog_data.find('\n  "moving-to-sammamish": {', redmond_record_start)
if redmond_record_start == -1 or redmond_record_end == -1:
    raise ValueError("Could not locate the moving-to-redmond article record")
redmond_record = blog_data[redmond_record_start:redmond_record_end]
if redmond_record.count(redmond_donor) != 1:
    raise ValueError("Expected exactly one Redmond backward-link donor sentence in the Redmond article")
redmond_record = redmond_record.replace(redmond_donor, redmond_replacement, 1)
blog_data = blog_data[:redmond_record_start] + redmond_record + blog_data[redmond_record_end:]

records = ",\n".join(article_record(article) for article in ARTICLES)
closing_marker = "\n};"
last_closing_marker = blog_data.rfind(closing_marker)
if last_closing_marker == -1:
    raise ValueError("Could not find the blogData.ts record closing marker")
blog_data = blog_data[:last_closing_marker] + ",\n" + records + blog_data[last_closing_marker:]

index_marker = "export const BLOG_POSTS: BlogIndexPost[] = [\n"
if index_marker not in blog_posts:
    raise ValueError("Could not find the blogPosts.ts insertion marker")
for article in ARTICLES:
    blog_posts = blog_posts.replace(index_marker, index_marker + index_record(article), 1)

sitemap_entries = "\n".join(
    f'''  <url>
    <loc>https://onthegomoving.com/{article["slug"]}/</loc>
    <lastmod>{article["date_iso"]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>'''
    for article in ARTICLES
)
if "</urlset>" not in sitemap:
    raise ValueError("Could not find the sitemap closing tag")
sitemap = sitemap.replace("</urlset>", sitemap_entries + "\n</urlset>", 1)

llms_marker = "### Moving Tips & Guides\n"
if llms_marker not in llms:
    raise ValueError("Could not find the llms.txt Moving Tips & Guides section")
llms_entries = "\n".join(
    f'- [{article["title"]}](https://onthegomoving.com/{article["slug"]}/): {article["llms_description"]}'
    for article in reversed(ARTICLES)
) + "\n"
llms = llms.replace(llms_marker, llms_marker + llms_entries, 1)

BLOG_DATA.write_text(blog_data, encoding="utf-8")
BLOG_POSTS.write_text(blog_posts, encoding="utf-8")
SITEMAP.write_text(sitemap, encoding="utf-8")
LLMS.write_text(llms, encoding="utf-8")

print("Added Bellevue and Redmond articles, sitemap entries, llms.txt entries, and two contextual backward links.")
