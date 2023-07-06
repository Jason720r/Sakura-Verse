
export const ItemSearch = ({ setterFunction }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem', marginLeft: '27rem' }}>
        <input 
            onChange={(changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
            }
        type="text" placeholder= "Enter item name" />
        </div>
    )
}