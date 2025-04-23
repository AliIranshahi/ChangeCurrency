import React, { useEffect, useRef, useState } from 'react';
import './fonts.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useFetch } from './hooks/useFetch';
import Container from './components/container/Container';

function CurrencySwitcher() {
  // const {data , error , loading} = useFetch("curl https://dapi.p3p.repl.co/api/?currency=usd")

  const [changeCurrncy, setChangeCurrncy] = useState(true);
  const dollorPrice = "89,000";
  const [firstInput, setFirstInput] = useState<string>("")
  const [secondInput, setSecondInput] = useState<string>("")
  const [rotated, setRotated] = useState<boolean>(false);
  //مقادیر پایه جهت معرفی
  const [finalFirstInput, setFinalFirstInput] = useState<string>("")
  const [finalSecondInput, setFinalSecondInput] = useState<string>("")
  //----------------------

  //تعین کردن مود کارنسی
  const handleChange = () => {
    setChangeCurrncy(prev => !prev);

  };



  //عملیات سابمیت کردن فرم
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = "";
    if (changeCurrncy) {
      console.log("قیمت دلار به تومان =", secondInput);
      result = (parseInt(firstInput) * 89000).toLocaleString("fa-IR")
      // setSecondInput(() => (parseInt(firstInput) * 89000).toLocaleString("fa-IR"))
    }
    if (!changeCurrncy) {
      result = (parseInt(firstInput) / 89000).toLocaleString("en-US", { maximumFractionDigits: 2 });
      // setSecondInput(() => (parseInt(firstInput) / 89000).toLocaleString("en-US", { maximumFractionDigits: 2 }))
    }
    setSecondInput(result)
    setFinalFirstInput(firstInput);
    setFinalSecondInput(result);


  }

  //عملیات عوض شدن کارنسی
  const handleClickImage = () => {
    setRotated((prev) => !prev)
    setFinalFirstInput("");
    setFinalSecondInput("");
  }
  return (
    <div>
      <Container>
        <div className='dollorPrice'>
          <div className="pulse-wrapper">
            <div className="pulse"></div>
            <div className="icon">
            </div>
          </div>
          <span>
            قیمت دلار : {dollorPrice} تومان
          </span>
        </div>
      </Container>
      {
        changeCurrncy ?
          <div className='dollorSection' style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <div style={{ background: "#dbdbdb", padding: "5px 10px", borderRadius: "15px" }}>
              دلار
            </div>
            <div style={{ background: "#dbdbdb", padding: "5px 10px", borderRadius: "15px" }}>
              تومان
            </div>
          </div>
          :
          <div className='dollorSection' style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <div style={{ background: "#dbdbdb", padding: "5px 10px", borderRadius: "15px" }}>
              تومان
            </div>
            <div style={{ background: "#dbdbdb", padding: "5px 10px", borderRadius: "15px" }}>
              دلار
            </div>
          </div>

      }

      <form onSubmit={handleSubmit}>
        <label htmlFor="changeCurrency">
          <input
            type="text"

            value={firstInput}
            required
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setFirstInput(value);
              }
            }}
          />
          <span onClick={handleChange}>
            <img src="/images/swap.svg" alt="swap" onClick={handleClickImage} className={`imageSwap ${rotated ? "rotated" : ""}`} />
          </span>
          <input type="text" className='form-contorl' disabled value={secondInput} />
        </label>

        <button>
          تبدیل کن
        </button>
      </form>
      {
        finalFirstInput && (
          <div className='resultFound'>
            {
              changeCurrncy && finalSecondInput && <p dir='rtl'> {finalFirstInput && Number(finalFirstInput).toLocaleString("en-US")} دلار برابر است با {finalSecondInput} تومان</p>
            }
            {
              !changeCurrncy && finalSecondInput && <p dir='rtl'> {finalFirstInput && Number(finalFirstInput).toLocaleString("fa-IR")} تومان برابر است با {finalSecondInput} دلار </p>
            }
            {/* {
            changeCurrncy  ? <p dir='rtl'> {finalFirstInput && Number(finalFirstInput).toLocaleString("fa-IR")} دلار برابر است با {finalSecondInput} تومان</p> : <p dir='rtl'> {finalFirstInput} تومان برابر است با {finalSecondInput} دلار </p>
          } */}
          </div>
        )
      }




    </div>
  );
}

export default CurrencySwitcher;
