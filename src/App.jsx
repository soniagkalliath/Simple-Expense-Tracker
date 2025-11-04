
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [expenseName,setExpensename] = useState("")
  const [amount,setAmount] = useState("")
  const [total,setTotal] = useState(0)
  const [allExpenses,setAllExpenses] = useState([])

  console.log(allExpenses);

  useEffect(()=>{
    if(allExpenses?.length>0){
      setTotal(allExpenses?.map(item=>+item.amount).reduce((acc,curr)=>acc+curr))
    }else{
      setTotal(0)
    }
  },[allExpenses,total])
  
  const handleAddExpense = ()=>{
    if(!expenseName || !amount ){
      alert("Please fill the form completely!!!")
    }else{
      setAllExpenses([...allExpenses,{id:Date.now(), expenseName,amount}])
    }
    setExpensename("")
    setAmount("")
  }

  const handleRemoveExpense = (id)=>{
    setAllExpenses(allExpenses?.filter(item=>item.id!=id))
  }
  return (
    <div className='container my-5'>
        <h1 className="text-center my-5">Tracker App</h1>

        <div className="my-5 p-5 d-flex justify-content-center align-items-center flex-column border rounded   shadow">
          <input value={expenseName} onChange={e=>setExpensename(e.target.value)} type="text" className="form-control w-50"  placeholder='Enter Expense Name' />
          <input value={amount} onChange={e=>setAmount(e.target.value)} type="text" className="form-control w-50 my-3" placeholder='Enter Amount' />
          <button onClick={handleAddExpense} className="btn btn-success ms-5">Add Expense</button>
        </div>
        <h2 className="text-danger my-5">Total : ${total} </h2>
        {/* list */}
        <ul className='list-group'>
            {
              allExpenses?.map(item=>(
                <li key={item?.id} class="list-group-item fw-bolder fs-5 ">{item?.expenseName} - {item?.amount} <button onClick={()=>handleRemoveExpense(item?.id)} className="btn text-danger"><i className="fa-solid fa-trash"></i></button> </li>
              ))
            }
        </ul>
    </div>
  )
}

export default App
