import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BiDollar, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { useData } from '../contexts/dataContext';
import '../styles/GrowthForm.css';
import { formatGrowthPercent } from '../utils/formatGrowthPercent';
import { numberIsValid } from '../utils/numberIsValid';

function isProfit(growthPercentage) {
    return growthPercentage >= 0;
}

const GrowthForm = () => {
    const { setTargetPrice, percentage, targetPrice } = useData();
    const { t } = useTranslation();
    const targetPriceRef = useRef();

    useEffect(() => {
        targetPriceRef.current.value = targetPrice || '';
    }, [targetPrice]);

    function handleTargetPriceChange(e) {
        let targetPrice = e.target.value;
        if (targetPrice.length > 12) e.preventDefault();
        if (!targetPrice) setTargetPrice("0");
        if (numberIsValid(targetPrice)) setTargetPrice(targetPrice);
    }

    function handleAddPrice() {
        const newValue = targetPrice + 1;
        setTargetPrice(newValue);
    }

    function handleMinusPrice() {
        const newValue = targetPrice - 1;
        setTargetPrice(newValue);
    }

    return (
        <div className="container">
            <label htmlFor="target-price">{t('target_price_label')}</label>
            <div id="target-price-area">
                <div className="input-wrapper" >
                    <input id="target-price-input" ref={targetPriceRef} name="target-price" maxLength="12" onChange={handleTargetPriceChange} />
                    <span><BiDollar /></span>
                </div>
                <div className="btns">
                    <button className="btn plus" onClick={handleAddPrice}>+</button>
                    <button className="btn minus" onClick={handleMinusPrice}>-</button>
                </div>
            </div>
            <div className="growth-container">
                <span
                    className="caret"
                    id={isProfit(percentage) ? "profit" : "loss"}
                >{isProfit(percentage) ? <BiCaretUp /> : <BiCaretDown />}</span>
                {formatGrowthPercent(percentage)}%
            </div>
        </div>
    );
}

export default GrowthForm;