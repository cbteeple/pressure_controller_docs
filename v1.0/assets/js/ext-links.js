// any link that is not part of the current domain is modified

var links = document.links;

console.log(window.location.hostname)
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname & !(links[i].hostname === "")  ) {
       links[i].target = '_blank';
   } 
}