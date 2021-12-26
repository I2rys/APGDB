//Main
async function self(axios){
    var data = {
        type: "https",
        proxies: []
    }

    return new Promise(async(resolve)=>{
        try{
            var response = await axios({
                method: "GET",
                url: "https://proxylist.geonode.com/api/proxy-list?limit=50&page=1&sort_by=lastChecked&sort_type=desc&protocols=http%2Chttps"
            })

            response = response.data.data

            for( i in response ){
                data.proxies.push(`${response[i].ip}:${response[i].port}`)
            }

            return resolve(data)
        }catch{
            return resolve(data)
        }
    })
}

//Exporter
module.exports =  {
    self
}