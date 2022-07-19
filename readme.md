> This plugin for Parcel useful for processing Eta templates.

The plugin includes implementation of Eta template engine, which can process
files of your project. With this package, you can build pages using a full power of NodeJS.

Some alternative packages have some troubles with async/await syntax, but this one fixes this problem.

## Install

Install the package using the following command:

    npm i -D parcel-transformer-etajs

## Enable

Add a plugin name with the extensions you want to process into
`transformers` section of your `.parcelrc` file:

    {
        "extends": "@parcel/config-default",
        "transformers": {
            "*.eta": ["parcel-transformer-etajs"]
        }
    }

## Use

Just use JavaScript inside your template!
```ejs
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Articles Catalog</title>
        </head>
        <body>
            <%
                async function getArticleData(file, baseDir) {
                     const fs = await import("fs/promises");
                     const content = await fs.readFile(`${baseDir}/${file}`, { encoding: "utf-8" });
                     const title = /<h1(.*?)>(.*)<\/h1>/.exec(content)[2];
            
                     return { file: file, title };
                }
            
                async function getAllArticles() {
                    const fs = await import("fs/promises");
                    const baseDir = "./articles";
                    const files = await fs.readdir(baseDir);
            
                    return Promise.all(
                        files
                            .filter(file => file !== "index.eta")
                            .map(async file => await getArticleData(file, baseDir)));
                }
            %>
            
            <% for (const article of await getAllArticles()) { %>
                <a href="<%= article.file %>"><%= article.title %></a>
            <% } %>
        </body>
    </html>
```