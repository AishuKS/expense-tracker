import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from '../../context/globalContext'
import Button from '../button/button'
import { plus } from '../../utils/icons'

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext()
    const [inputData, setInputData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputData

    const handleInputChange = name => e => {
        setInputData(prevState => ({
            ...prevState,
            [name]: e.target.value,
        }))
        setError('')
    }

    const handleDateChange = date => {
        setInputData(prevState => ({
            ...prevState,
            date,
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (title && amount && date && category) {
            addExpense(inputData)
            setInputData({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            })
        } else {
            setError('Please fill all the required fields.')
        }
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <div className="input-control">
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Expense Title"
                    onChange={handleInputChange('title')}
                    required
                />
            </div>

            <div className="input-control">
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    placeholder="Expense Amount"
                    onChange={handleInputChange('amount')}
                    required
                />
            </div>

            <div className="input-control">
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Enter a Date"
                    required
                />
            </div>

            <div className="input-control">
                <select
                    name="category"
                    value={category}
                    onChange={handleInputChange('category')}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Add a reference"
                    onChange={handleInputChange('description')}
                    rows="4"
                />
            </div>

            <div className="submit-btn">
                <Button
                    name="Add Expense"
                    icon={plus}
                    bPad="0.8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control {
        width: 100%;
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`

export default ExpenseForm
