import React from 'react'
import { GetStaticProps, GetStaticPropsResult, GetServerSideProps, GetStaticPropsContext, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';



const index = ({asd}:X) => {
  //  console.log(asd)
    return (
        <div>
            i need to know type of media first before getServerSideProps ?!

            {
           //     asd
            }
        </div>
    )
}

export default index

interface X {
    asd: any
   
}
export async function getServerSideProps(context:GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
     try {
        const aaa=context
      
      console.log(aaa.query)
 
         return {
             props: {
                 asd: "aaa"
                 
             },
         }
 
     } catch (error) {
         return {
             props: {
                 asd:"error"
             },
         }
     }
 } 
