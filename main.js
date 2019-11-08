// 抽取出文本中的脚本和link
// 用来匹配标签中的属性
const attributeReg = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 匹配script标签
let scriptReg = /<(script)(\b[^<]*)>([\s\S]*?)<\/script\b[^>]*>/;
// 匹配style标签
let styleReg = /<(style)\b[^<]*>([\s\S]*?)<\/style\b[^>]*>/;
// 匹配link标签
let linkReg = /<(link)(\b[^<]*)\\?>([\s\S]*?<\/link\b[^>]*>)?/;
// 匹配开始标签
let startAssetTag = /(<script)|(<style)|(<link)/

export function parse(html) {
    let scriptArr = [];
    let styleArr = [];
    while(html) {
        let match  = html.match(startAssetTag)
        if(match) {
            let index = match.index;
            if(index>0) { // 去除<前面值
                html = html.substring(index)
            }
            let innerMatch;
            if(html.match(scriptReg) && match[1] == '<script') {
                innerMatch = html.match(scriptReg);
                parseScript(innerMatch)
              
            }
            if(html.match(styleReg) &&  match[2] == '<style') {
                innerMatch = html.match(styleReg);
                parseStyle(innerMatch)
            }
            if(html.match(linkReg) && match[3] == '<link') {
                innerMatch = html.match(linkReg);
                parseLink(innerMatch)
            }
            advance(innerMatch[0].length)
        } else {
            break;
        }
    }

    function parseScript(asset) {
        let temp = {
            isInline: false,
            type: 'script',
            matchStr: asset[0]||'',
            attribute: {},
            content: ''
        }
        let content = asset[3] && asset[3].trim() || '';
        let attribute = asset[2] && asset[2].trim() || '';
        if(content) { //有值就是内联的
            temp.isInline = true;
            temp.content = content
        }
        if(attribute) { //script中有属性， 解析出来
            temp.attribute = parseAttribute(attribute)
        }
        scriptArr.push(temp)
    }

    function parseStyle(asset) {
        let temp = {
            isInline: true,
            type: 'style',
            matchStr: asset[0]||'',
            content: asset[2] && asset[2].trim() || ''
        }
        styleArr.push(temp)
    }

    function parseLink(asset) {
        let temp = {
            isInline: false,
            type: 'style',
            matchStr: asset[0]||'',
            attribute: {},
            content: ''
        }
        let attribute = asset[2] && asset[2].trim() || '';
        if(attribute) {
            temp.attribute = parseAttribute(attribute)
        }
        styleArr.push(temp)
    }
    function parseAttribute(attr) {
        let t = {};
        while(attr) {
            let matchAttr = attr.match(attributeReg);
            if(matchAttr) {
                if(matchAttr[1]) {
                    t[matchAttr[1]] = matchAttr[3]
                }
                if(!matchAttr[1]) {
                    t[matchAttr[0]] = true
                }
                attr = attr.substring(matchAttr[0].length)
            } else {
                break;
            }
        }
        return t;
    }
    function advance (n) {
        html = html.substring(n)
    }

    return { 
        scriptArr,
        styleArr
    }
}