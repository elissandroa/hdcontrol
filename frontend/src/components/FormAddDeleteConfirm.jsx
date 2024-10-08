import React from 'react'
import './FormAddDeleteConfirm.css'

export const FormAddDeleteConfirm = ({onModalDelete, onDelete, delId}) => {
    return (
        <div className="fade">
            <div className="modal">
                <div>
                    <h2>Deseja excluir ?</h2>
                </div>
                <div className='buttons-container'>
                    <button type='submit' className='btnCancel' onClick={async () => await onDelete(delId)}>Sim</button>
                    <button className='btnAdd' onClick={onModalDelete}>Não</button>
                </div>
            </div>
        </div>
    )
}
