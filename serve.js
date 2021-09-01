const http = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const host = 'localhost';
const port = 8000;
var r = new XMLHttpRequest();
obj =[]
function getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    //if (!caseSensitive) {
      //  str = str.toLowerCase();
        //searchStr = searchStr.toLowerCase();
    //}
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

r.open('GET', 'https://time.com', false);
r.send(null);
console.log(r.status)
if(r.status == 200) {

   
    t = r.responseText
    //console.log(t.indexOf('t'))
    var indices = getIndicesOf('h2 class="title"', t);
    console.log(indices)
    links= []
    for (let index = 0; index < indices.length; index++) {
        k =indices[index]
        ans=''
        while(t[k]!='"' ){
            k++;
        }
        k++;
        while(t[k]!='"' ){
            k++;
        }
        k++;
        
        while(t[k]!='"' ){
            ans+= t[k];
            k++;
        }
    if(index>17 && index<23){
            links.push(ans)
        }
        
    }
    console.log(links)
    for (let index = 0; index < links.length; index++) {
        lk=''
        hd=''
        x= links[index]
        k =0
        while(x[k]!='/'){
            k++;
        }
        while(x[k]!= '>'){
            lk+= x[k]
            k++;
        }
        k++;
        while(x[k]!= '<'){
            hd+= x[k]
            k++;
        }

        alpha={"tiltle":hd, "link":"https://time.com"+lk}
        obj.push(alpha)
    }
  
}
const requestListener = function (req, res) {
   
    res.writeHead(200);
    res.end(JSON.stringify(obj));
};


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

