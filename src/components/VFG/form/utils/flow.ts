import {
    jsPlumb
} from "jsplumb";

const connectorStyle: any = {
    ConnectionsDetachable: false,
    MaxConnections: 100,
    //连线类型
    Anchors: ['Bottom', 'Top'],
    Connector: ["Flowchart"],

    Endpoints: [
        ["Dot", {
            radius: 4
        }],
        ["Dot", {
            radius: 5
        }]
    ],
    EndpointStyles: [{
        fill: "#3296fa"
    }, {
        fill: "#3296fa"
    }]
};

const lines: any = {
    condition: [

    ],
    default: [
        ['Label', {
            label: '<button class="add-node-btn">+</button>',
            cssClass: '',
            labelStyle: {
                color: 'red'
            },
            events: {
                click: function (diamondOverlay: any, originalEvent: any) {
                    console.log("double click on diamond overlay for : ", diamondOverlay.component);
                }
            }

        }],
    ]
}

export default {
    install: (app: any, options: any) => {
        const plumbIns = jsPlumb.getInstance();

        plumbIns.importDefaults(connectorStyle);
        app.provide("plumbIns", plumbIns);

        app.config.globalProperties.$plumbIns = () => {
            console.log(1)
        };
        app.directive('flow', function (el: any, binding: any) {

            let lineType = binding.arg;

            let ele = binding.value;

            if (ele && ele.father) {
                for (let f of ele.father) {
                    plumbIns.connect({
                        target: el,
                        source: f,
                        overlays: lines[lineType],
                    });
                }
            }
        })
    }
}