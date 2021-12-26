//Main
async function self(axios){
    var data = {
        type: "socks4",
        proxies: []
    }

    return new Promise(async(resolve)=>{
        try{
            var response = await axios({
                method: "GET",
                url: "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all"
            })

            response = response.data

            data.proxies = response.split("\n")
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