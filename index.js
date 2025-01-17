import { writeFileSync } from "fs";
import jsdom from "jsdom";
import xlsx from "node-xlsx";
const { JSDOM } = jsdom;

const links = [
    {
        name: "Poolesville High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/poolesvillehs/staff/directory/",
    },
    {
        name: "Winston Churchill High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/churchillhs/staff/directory/",
    },
    {
        name: "Walter Johnson High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/wjhs/staff/staff-directory/",
    },
    {
        name: "Richard Montgomery High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/rmhs/staff/directory/",
    },
    {
        name: "Thomas S. Wootton High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/woottonhs/staff/directory/",
    },
    {
        name: "Bethesda-Chevy Chase High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/bcchs/staff/directory/",
    },
    {
        name: "Albert Einstein High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/einsteinhs/staff/directory/",
    },
    {
        name: "Clarksburg High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/clarksburghs/staff/directory/",
    },
    {
        name: "Damascus High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/damascushs/staff/directory/",
    },
    {
        name: "Blake High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/blakehs/staff/directory/",
    },
    {
        name: "Gaithersburg High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/gaithersburghs/staff/directory/",
    },
    {
        name: "Magruder High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/magruderhs/staff/directory/",
    },
    {
        name: "Northwest High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/northwesths/staff/directory/",
    },
    {
        name: "Quince Orchard High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/qohs/staff/directory/",
    },
    {
        name: "Rockville High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/rockvillehs/staff/directory/",
    },
    {
        name: "Seneca Valley High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/senecavalleyhs/staff/directory/",
    },
    {
        name: "Sherwood High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/sherwoodhs/staff/directory/",
    },
    {
        name: "Springbrook High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/springbrookhs/staff/directory/",
    },
    {
        name: "Watkins Mill High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/watkinsmillhs/staff/directory/",
    },
    {
        name: "Wheaton High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/wheatonhs/admin/directory/",
    },
    {
        name: "John F. Kennedy High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/kennedyhs/staff/directory/",
    },
    {
        name: "Northwood High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/northwoodhs/staff/directory/",
    },
    {
        name: "Paint Branch High School",
        link: "https://www2.montgomeryschoolsmd.org/schools/paintbranchhs/staff/directory/",
    }
];
//  no blair or edison or whitman
const out = [];

for (let link of links) {
    const HTML = await fetch(link.link).then((res) => {
        return res.text();
    });

    const dom = new JSDOM(HTML);

    const elementList = [
        ...dom.window.document.querySelectorAll("h3, div#employee"),
    ];
    
    let init = false;
    const employeeDivs = [];
    elementList.forEach((element) => {
        const textContent = element.textContent;
        const type = element.tagName;
        if (type == "H3" && textContent.includes("Science")) {
            init = true;
        } else if (type == "H3") {
            init = false;
        }
        if (type == "DIV" && init) {
            employeeDivs.push(element);
        }
    });

    const employeeData = employeeDivs.map((div) => {
        const map = div.textContent
            .split("\n")
            .map((val) => val.trim())
            .filter((val) => val.length > 0);
        map.push(link.name);
        return map;
    });

    out.push(...employeeData);
    console.log(link.name);
}

console.log(out);
const buffer = xlsx.build([{ name: "Sheet 1", data: out }]);

writeFileSync("out.xlsx", buffer);
