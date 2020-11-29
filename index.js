const inquirer = require("inquirer");
inquirer.
    prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Describe your project.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'How is your application installed?',
            name: 'installation'
        },
        {
            type: 'input',
            message: 'Explain what your application is used for and how to use it.',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'How can other developers contribute to your project?',
            name: 'contributions'
        },
        {
            type: 'input',
            message: 'How can a user test your application?',
            name: 'test'
        },
        {
            type: 'list',
            message: 'What type of license do you need?',
            name: 'license',
            choices: ['MIT', 'ISC', 'GNU GPLv3']
        },
        {
            type: 'input',
            message: 'What year is it?',
            name: 'copyrightYear'
        },
        {
            type: 'input',
            message: 'What is your name?',
            name: 'name'
        },
        {
            type: 'input',
            message: "Write one line to give the program's name and a brief idea of what it does.",
            name: 'gnu',
            when: (answers) => answers.license === 'GNU GPLv3'
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'github'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email'
        },

    ])
    .then((response) => {
        const fs = require("fs");
        const licenses = [
            {
                name: 'MIT',
                badge: 'https://img.shields.io/badge/license-MIT-green',
                notice: `
                MIT License

                Copyright (c) ${response.copyrightYear} ${response.name}
                
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.`
            },
            {
                name: 'ISC',
                badge: 'https://camo.githubusercontent.com/6628d684513422b8b959d29bcd415e41812e297c5e3422437556c6b23c533bf3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4953432d626c75652e737667',
                notice: `
                ISC License (ISC)
                Copyright ${response.copyrightYear} ${response.name}
                
                Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
                
                THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`
            },
            {
                name: 'GNU GPLv3',
                badge: 'https://camo.githubusercontent.com/400c4e52df43f6a0ab8a89b74b1a78d1a64da56a7848b9110c9d2991bb7c3105/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d47504c76332d626c75652e737667',
                notice: `
                ${response.gnu}
                Copyright (C) ${response.copyrightYear}  ${response.name}
            
                This program is free software: you can redistribute it and/or modify
                it under the terms of the GNU General Public License as published by
                the Free Software Foundation, either version 3 of the License, or any later version.
            
                This program is distributed in the hope that it will be useful,
                but WITHOUT ANY WARRANTY; without even the implied warranty of
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                GNU General Public License for more details.`
            }
        ]
        var license;
        var licenseNotice;
        for (i = 0; i < licenses.length; i++) {
            if (licenses[i].name === response.license) {
                licenseBadge = licenses[i].badge;
                licenseNotice = licenses[i].notice;
            }
        }
        fs.writeFile("newREADME.md", `# ${response.title} ![](${licenseBadge})\n\n`, (err) => {
            err ? console.error(err) : console.log('Added title and license badge!')
        });
        fs.appendFile("newREADME.md", `Link to App: https://${response.github}.github.io/${response.title}/\n\n## Table of Contents\n\n[Description](https://github.com/${response.github}/${response.title}#description)\n\n[Installation Instructions](https://github.com/${response.github}/${response.title}#installation-instructions)\n\n[Usage Information](https://github.com/${response.github}/${response.title}#usage-information)\n\n[Test Instructions](https://github.com/${response.github}/${response.title}#test-instructions)\n\n[License](https://github.com/${response.github}/${response.title}#license)\n\n[Questions](https://github.com/${response.github}/${response.title}#questions)\n\n`, (err) => {
            err ? console.error(err) : console.log('Added a table of contents!')
        });
        fs.appendFile("newREADME.md", `### Description\n\n${response.description}\n\n### Installation Instructions\n\n${response.installation}\n\n### Usage Information\n\n${response.usage}\n\n### Test Instructions\n\n${response.test}\n\n### License\n\n${licenseNotice}\n\n### Questions\n\nGitHub Profile: https://github.com/${response.github}\n\nEmail: ${response.email} \n\nContact me through the issues panel on for this project or send me an email with any questions about this project.`, (err) =>
            console.log('Added description, installation instructions, usage information, test instructions, license, and questions! All done!')
        );
    });