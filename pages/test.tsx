import React ,{useState ,useEffect }from 'react'

const test = () => {
    const [state, setstate] = useState('')
    /* async function getCountry() {
        let counrty=""
       // try {
             const ddd= await fetch(`https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IPDATA_KEY}&fields=country_code`)
               .then((res)=>{
                const data =   ddd.json()  as any
                counrty = data
               })
               .catch((error)=>{
                counrty="error"
               })
           
     //   } catch (error) {
           
     //   }
      return counrty
    } */


    async function getCountry() {
        let counrty=""
        try {
            const resCounrty = await fetch(`https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IPDATA_KEY}&fields=country_code`)
            const data = await resCounrty.json() 
           counrty=data.country_code 
           setstate(data.country_code )
        } catch (error) {
            counrty="error"
        }
      return counrty
    }
 //let d = getCountry() as unknown as string
  //  console.log(getCountry())
  useEffect(() => {
    getCountry()
      
  }, [])
    return (
        <div>
           {state}
        </div>
    )
}

export default test
