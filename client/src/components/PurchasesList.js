import React, {createRef} from 'react'
import './purchasesList.css'

function PurchasesList({purchases}) {


    function togglePurchases(ref) { // toggle display of purchase list
        console.log(ref.current.style.display)
        ref.current.style.display = ref.current.style.display === "none" ? "block" : "none";
    }

    const ref = createRef()
    
    return (
        <>
            {purchases ? purchases.length : 0} purchases
            {purchases && <button onClick={() => togglePurchases(ref)} className='purchases-btn'>
                <i class="fa-solid fa-question"></i>
                
                <div className="purchases-modal" style={{display: "none"}} ref={ref}>
                {purchases && <p className='header'><label>Book title</label><label>Remaining</label></p>}
                {purchases?.map((item, idx) => {
                    return (<p key={idx}>
                            <label className='purchase-title'>{item.title}</label><label className='purchase-quantity'>{item.quantity}</label>
                        </p>)
                })}
                </div>
            
            </button>}
        </>
  )
}

export default PurchasesList