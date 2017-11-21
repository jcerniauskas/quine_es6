const quineText = 
`const quineText = 

import fs from "fs";

const c = c => String.fromCharCode(c);

function write() {
    fs.writeFileSync("build/quine_output.js", quineText.split(c(10))[0] + c(10) + 
        c(96) + quineText + c(96) + ";" + c(10) + quineText.split(c(10)).slice(1).join(c(10)));
}

write();
`;

import fs from "fs";

const c = c => String.fromCharCode(c);

function write() {
    fs.writeFileSync("build/quine_output.js", quineText.split(c(10))[0] + c(10) + 
        c(96) + quineText + c(96) + ";" + c(10) + quineText.split(c(10)).slice(1).join(c(10)));
}

write();