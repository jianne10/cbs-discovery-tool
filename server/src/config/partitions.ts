export interface Partition {
  name: string
  apiHost: string
  apiHostAlt: string
  port: number
  portAlt: number
  sitekeys: string[]
}

export const partitions: Partition[] = [
  {
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
    sitekeys: ["theperfum123eshopcsom"],
  },
  // {
  //   name: "partition2",
  //   apiHost: "172.31.90.48",
  //   port: 9100,
  //   sitekeys: ["ctshirtscom"],
  // },
  //http://172.31.28.170:9100/api/v1/key/ctshirtscom/categories/query?locale=en_gb
]

export const getSitekeyPartition = (sitekey: string): Partition | undefined => {
  return partitions.find((partition) => partition.sitekeys.includes(sitekey))
}
