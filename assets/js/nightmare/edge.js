"use strict";

$.ajaxSettings.async = false;
const jsonNameList = ["edgeChichuToNumber", "edgeAlgToStandard", "edgePosToCode", "nightmareEdgeAlgToInfo"];
const jsonNameListPre = {"edgeChichuToNumber":"edgeChichuToNumber", "edgeAlgToStandard":"edgeAlgToStandard", "edgePosToCode":"edgePosToCode", "nightmareEdgeAlgToInfo":"nightmare/nightmareEdgeAlgToInfo"};
const jsonLoaded = jsonNameList.map((name) => $.getJSON(`../assets/json/${jsonNameListPre[name]}.json`, (json) => {
    window[`${name}`] = json;
}));
algSearch();

function sortByCode(x, y) {
    const edgeCodeToNumber2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
    return (edgeCodeToNumber2.indexOf(x[1]) - edgeCodeToNumber2.indexOf(y[1])) * 24 + (edgeCodeToNumber2.indexOf(x[2]) - edgeCodeToNumber2.indexOf(y[2]));
}

function algSearch() {
    const buffer = document.getElementById("edgeinput").value;
    const edgeinput = [];
    let codecookie = "DEGCGAAJWIXKOOMREDCXTQLMKHIRZZPSBBLSQNJYHFFYWTNP";
    if (getCookie("code") !== "") {
        codecookie = getCookie("code");
    }
    if (buffer === "") {
        let tab = `<table id="table"><thead><tr><th>${arrLang[lang]["nightmareLetters"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th></tr></thead><tbody>`;
        for (const algi in nightmareEdgeAlgToInfo) {
            for (let i = 0; i <= 2; i++) {
                if (algi[i] === "") {
                    edgeinput[i] = "";
                } else if (codecookie[edgeChichuToNumber[algi[i]]] === "") {
                    edgeinput[i] = algi[i];
                } else {
                    edgeinput[i] = codecookie[edgeChichuToNumber[algi[i]]];
                }
            }
            tab += "<tr>";
            tab += `<td>${`${edgeinput[0]}${edgeinput[1]}${edgeinput[2]}`}</td>`;
            tab += `<td>${nightmareEdgeAlgToInfo[algi].algorithm}</td>`;
            tab += `<td>${nightmareEdgeAlgToInfo[algi].commutator}</td>`;
            tab += `<td>${fingerbeginfrom(nightmareEdgeAlgToInfo[algi].algorithm)}</td>`;
            tab += "</tr>";
        }
        tab += "</tbody></table>";
        div1.innerHTML = tab;
    } else {
        const bufferPos = edgePosToCode[buffer];
        let tab = `<table id="table"><thead><tr><th>${arrLang[lang]["nightmareLetters"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th></tr></thead><tbody>`;
        const algList = [];
        for (const alg in edgeAlgToStandard) {
            if (alg[0] === bufferPos) {
                algList.push(alg);
            }
        }
        algList.sort(sortByCode);
        for (const alg of algList) {
            const algi = edgeAlgToStandard[alg];
            const algdisplay = alg.slice(1, 3);
            for (let i = 0; i <= 1; i++) {
                if (algdisplay[i] === "") {
                    edgeinput[i] = "";
                } else if (codecookie[edgeChichuToNumber[algdisplay[i]]] === "") {
                    edgeinput[i] = algdisplay[i];
                } else {
                    edgeinput[i] = codecookie[edgeChichuToNumber[algdisplay[i]]];
                }
            }
            tab += "<tr>";
            tab += `<td>${`${edgeinput[0]}${edgeinput[1]}`}</td>`;
            tab += `<td>${nightmareEdgeAlgToInfo[algi].algorithm}</td>`;
            tab += `<td>${nightmareEdgeAlgToInfo[algi].commutator}</td>`;
            tab += `<td>${fingerbeginfrom(nightmareEdgeAlgToInfo[algi].algorithm)}</td>`;
            tab += "</tr>";
        }
        tab += "</tbody></table>";
        div1.innerHTML = tab;
    }
    const r = $("#table").width() / $("#div1").width();
    if (r > 1) {
        $("#table").css("font-size", 16 / r);
    }
}