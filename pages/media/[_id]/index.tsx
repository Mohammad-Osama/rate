import React from 'react'

const index = () => {
    return (
        <div>
            i need to know type of media first before getServerSideProps ?!
        </div>
    )
}

export default index


/* export async function getServerSideProps(context:GetStaticPropsContext): Promise<GetServerSidePropsResult> {
     try {
        
 
         return {
             props: {
                 productProps: product as IProduct,
                 reviewInfoProps: reviews as IReviewInfo[],
                 loadingProps: false
             },
         }
 
     } catch (error) {
         return {
             props: {
                 productProps: {} as IProduct,
                 reviewInfoProps: [],
                 loadingProps: true
             },
         }
     }
 }  */
