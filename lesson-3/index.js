const struct1 = {
    src: {
        components: {
            nav: {
                navBar: ['index.js'],
                navBarMenu: ['index.js'],
                navBarSearch: ['index.js']
            }
        }
    }
}

const struct2 = {
    __init_tests__: [],
    __mocks__: [],
    __tests__: [],
    coverage: [],
    dist: [],
    docs: {
        api: [],
    },
    public: [],
    scripts: {
        deployment: [],
    },
    src: ['.gitignore', 'index.js', 'package.json']
}

import fs from 'node:fs';
import path from 'node:path';

const scaffoldProject = (obj, currentPath = '.') => {
    const keys = Object.keys(obj);

    keys.forEach(key => {
        const value = obj[key]; obj.__init_tests__
        const fullPath = path.join(currentPath, key); './__init_tests__'

        if (Array.isArray(value)) {
            fs.mkdirSync(fullPath, { recursive: true });

            value.forEach(file => {
                const filePath = path.join(fullPath, file);
                fs.writeFileSync(filePath, '');
            });
        } else {
            fs.mkdirSync(fullPath, { recursive: true });
            scaffoldProject(value, fullPath);
        }
    });
};


const buildRoot = 'my_project_root';

if (!fs.existsSync(buildRoot)) {
    fs.mkdirSync(buildRoot);
}

scaffoldProject(struct1, buildRoot);

const buildRoot2 = 'my_project_root2';

if (!fs.existsSync(buildRoot2)) fs.mkdirSync(buildRoot2);

scaffoldProject(struct2, buildRoot2);
