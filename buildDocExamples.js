var docsItems = [
    'rcc', 'rmcc', 'rmicc', 'rtscc', 'rtsmcc', 'rtsmicc', 'rjcc', 'rmjcc', 'rmijcc', 'rtsjcc', 'rtsmjcc', 'rtsmijcc', 
    'rsc', 'rmsc', 'rjsc', 'rmjsc', 'rscb', 'rmscb', 'rjscb', 'rmjscb', 'rcfc', 'ctor', 'cwm', 'cdm', 'cwr', 'scu', 'cwup', 'cdup', 'cwun', 
    'ren', 'sst', 'sstf', 'sstff', 'danger', 'mobimp', 'mobimpf', 'mobrimp', 'mobrimpf', 'mobactp', 'mobactm', 'mobobs', 'mobcom'
];

var fs = require('fs');

var snippets = eval('(' + fs.readFileSync('./snippets/snippets.json') + ')');
var propertyMap = new Map(Object.keys(snippets).map(key => ([snippets[key].prefix, snippetToDisplay(snippets[key].body)])));

var snippetsItems = docsItems.map(prefix => prefix + ':\n\n' + '```javascript\n' + propertyMap.get(prefix) + '\n```\n---');

fs.writeFileSync('./README.md', fs.readFileSync('./README-base.md') + snippetsItems.join('\n\n'));


function snippetToDisplay(snippetBody){
    var propsText = "yourProps"; 
    return snippetBody
                .replace(/\t/g, '    ')
                .replace(/\${1:componentName}/g, 'YourComponentName')
                .replace(/\${2:componentName}/g, 'YourComponentName')
                .replace(/\${1:methodName}/g, 'methodName')
                .replace(/\${1:propertyName}/g, 'propertyName')
                .replace(/\${0:injectedProps}/g, "'injectedProps'")
                .replace(/\${1:injectedProps}/g, "'injectedProps'")

                .replace(/\${1:newState}/g, 'newState')
                .replace(/\${1:props}/g, propsText)
                .replace(/\${2:props}/g, propsText)
                .replace(/\${2:any}/g, 'propType')
                .replace(/\${3:any}/g, 'stateType')
                .replace(/\$0/g, '|');
}