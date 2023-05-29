import React, {useState} from 'react'
import { deleteBook, promoteUser, deleteUser, editBook, addBook } from '../service/adminController.js';
import './modal.css'

function Modal({action, item, closeModal, updateData}) {

    const [titleField, setTitleField] = useState("");
    const [authorField, setAuthorField] = useState("");
    const [quantityField, setQuantityField] = useState("");

    async function performAction() {

        if(action === "delete book") {
            await deleteBook(item.title);
        } else if (action === "delete user") {
            await deleteUser(item.username);
        } else if (action === "promote user") {
            await promoteUser(item.username);
        } else if (action === "edit book") { 
            const newBook = {// Helt galen syntax, men läggar bara in en key och value, om field är i fyllt
                ...(titleField !== "" && { title : titleField }),
                ...(authorField !== "" && { author : authorField }),
                ...(quantityField !== "" && { quantity : quantityField })
            }
            await editBook(item.title, newBook);
        } else if (action === "add book") {
            const newBook = {// Helt galen syntax, men läggar bara in en key och value, om field är i fyllt
                ...(titleField !== "" && { title : titleField }),
                ...(authorField !== "" && { author : authorField }),
                ...(quantityField !== "" && { quantity : quantityField })
            }
            await addBook(newBook);
        }
        
        updateData()
        closeModal()
    }

    return (<>
            {(action === "delete book" || action === "delete user" || action === "promote user") && <>
                <div className="modal-bg"></div>
                <div className='delete-modal'>
                    <h2>Change user settings</h2>
                    <p>Are you sure you wish to {action} {item?.title || item.username}?</p>

                    <div className="btn-wrapper">
                        <button onClick={performAction} className='proceed'>Proceed</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </>}
            {(action === "edit book" || action === "add book") && <>
                <div className="modal-bg"></div>
                <div className='delete-modal'>
                    <h2>{action.charAt(0).toUpperCase() + action.slice(1)}</h2>
                    
                    <div className="input-wrapper">
                        <p>Title - {item?.title}</p>
                        <input type="text" name="" placeholder='Insert new title...' onChange={(e) => setTitleField(e.target.value)}/>
                    </div>
                    
                    <div className="input-wrapper">
                        <p>Author - {item?.author}</p>
                        <input type="text" name="" placeholder='Insert new author...' onChange={(e) => setAuthorField(e.target.value)}/>
                    </div>

                    <div className="input-wrapper">
                        <p>Quantity - {item?.quantity}</p>
                        <input type="text" name="" placeholder='Insert new quantity...' onChange={(e) => setQuantityField(e.target.value)}/>
                    </div>

                    <div className="btn-wrapper">
                        <button onClick={performAction} className='proceed'>Save changes</button>
                        <button onClick={closeModal}>Discard changes</button>
                    </div>
                </div>
            </>} 
        </>
    )
}

export default Modal