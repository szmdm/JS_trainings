function setup() {

    noCanvas()
    const video = createCapture(VIDEO)
    video.size(160, 120)
    
    const rightColumn = querySelector('.rightColumn')
    rightColumn.append(noCanvas())
    

    const button = document.getElementById("getDirData")
    let lat, lon;
    button.addEventListener("click", async (event) => {
        const vege = document.getElementById("vege").value
        video.loadPixels()
        const image64 = video.canvas.toDataURL()
        const data = { lat, lon, vege, image64 };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api", options);
        const json = await response.json();
        console.log(json);
    });

    if ('geolocation' in navigator) {
        console.log('geolocation is available')
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude
            lon = position.coords.longitude

            document.getElementById('lat').textContent = lat
            document.getElementById('lon').textContent = lon

            // console.log( lat, lon )

        });

    } else {
        console.log('geolocation is NOT available')
    }

    const sortTime = document.querySelector('.sortByTimeBtn')
    const sortName = document.querySelector('.sortByNameBtn')

    sortTime.addEventListener("click", (event) => {
        getData(time)
    })

    getData()

    async function getData() {
        const response = await fetch('/api')
        const data = await response.json()
        
        // function that generate 4mark ID
        //
        // let id4 = () => {
        //     return Math.floor((1 + Math.random()) * 0x10000)
        //         .toString(16)
        //         .substring(1);
        //   }

        for (item of data) {
            const ul = document.querySelector('.vege_list')
            const root = document.createElement('div')
            const vege = document.createElement('div')
            const geo = document.createElement('div')
            const date = document.createElement('div')
            const image = document.createElement('img')

            vege.textContent = `favourite vege: ${item.vege}`
            geo.textContent = `${item.lat}°, ${item.lon}°`
            const dateString = new Date(item.timestamp).toLocaleString()
            date.textContent = dateString
            image.src = "/img/" + item.image_file
            image.alt = "your selfie photo id:" + item._id

            root.append(vege, geo, date, image)

            listCreate = (listData) => {
                const li = document.createElement('li')
                li.append(listData)
                return li
            }

            let list = listCreate(root)
            ul.append(list)

        }
        console.log(data)
    }

}