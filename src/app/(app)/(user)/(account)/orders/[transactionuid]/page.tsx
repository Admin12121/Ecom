import React from 'react'
import OrderRetrieve from './_components'

export default async function Page({ params }: { params: Promise<{ transactionuid: string }> }) {
 const transactionuid = (await params).transactionuid
  return (
    <OrderRetrieve transactionuid={transactionuid}/>
  )
}