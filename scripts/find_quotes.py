import re

path = r'c:\Users\Xgm\Desktop\APPWBP\scripts\blog-articles-productivity.mjs'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

quotes = re.findall(r'\"([^\"]{30,})\"', content)
for q in quotes:
    print('Quote:', q)
