"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSitekeyPartition = exports.partitions = void 0;
exports.partitions = [{
        name: "partition1",
        apiHost: "172.31.28.170",
        apiHostAlt: "172.31.90.48",
        port: 9100,
        portAlt: 9300,
        sitekeys: ["ctshirtscom"],
    },
    {
        name: "partition1",
        apiHost: "172.31.28.170",
        apiHostAlt: "172.31.90.48",
        port: 9100,
        portAlt: 9300,
        sitekeys: ["examplecom"],
    },
    // {
    //   name: "partition2",
    //   apiHost: "172.31.90.48",
    //   port: 9100,
    //   sitekeys: ["ctshirtscom"],
    // },
    //http://172.31.28.170:9100/api/v1/key/ctshirtscom/categories/query?locale=en_gb
];
const getSitekeyPartition = (sitekey) => {
    return exports.partitions.find((partition) => partition.sitekeys.includes(sitekey));
};
exports.getSitekeyPartition = getSitekeyPartition;