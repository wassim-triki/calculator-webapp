const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.classList.toggle("ripple");
    setTimeout(() => btn.classList.toggle("ripple"), 500);
  });
});

const setResult = (num = 0) => {
  document.querySelector(".result").textContent = getFormatted(num);
};
const setHistory = (num = 0) => {
  document.querySelector(".history").textContent = num;
};
const getResult = () => {
  return getUnformatted(document.querySelector(".result").textContent);
};
const getHistory = () => {
  return document.querySelector(".history").textContent;
};

const getFormatted = (num = 0) => {
  return num.toLocaleString("en-US");
};

const getUnformatted = (str) => {
  return str.replace(/[,]+/g, "");
};

const clearAll = () => {
  setResult(0);
  setHistory(0);
};

const backSpace = () => {
  let result = getResult();
  if (Number(result) > 0 || result.length > 1) {
    let unformatted = getUnformatted(result);
    let newResult = Number(unformatted.substring(0, unformatted.length - 1));
    isNaN(newResult) ? setResult(0) : setResult(newResult);
  }
};

let clicked = false;

const evaluate = () => {
  clicked = true;
  let history = getHistory();
  let lastResult = getResult();
  let validation = /\d$/;
  let endsWithDigit = validation.test(history);
  let result;
  if (history != "0") {
    if (endsWithDigit) {
      result = eval(history);
    } else {
      let currentResult = getResult();
      if (currentResult != 0) {
        result = eval(history.replace(/\s/g, "") + currentResult);
      } else {
        let validHistory = history.slice(0, history.length - 1);
        result = eval(validHistory);
      }
    }
    if (lastResult != 0 && !endsWithDigit) {
      let newHistory = history + lastResult;
      setHistory(newHistory);
    } else {
      if (!endsWithDigit) {
        setHistory(history.replace(/\D$/, ""));
      }
    }
  } else {
    result = lastResult;
  }

  setResult(result);
};

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    let result = getResult();
    if (result != "0") {
      setResult(getFormatted(Number(result + num.id)));
    } else {
      setResult(Number(num.id));
    }
  });
});

operators.forEach((op) => {
  op.addEventListener("click", () => {
    let history = getHistory();
    let result = getResult();
    let operator = op.id;
    const toAdd = operator;
    const endsWithOperator = /\D$/;
    if (!clicked) {
      if (history != "0") {
        if (endsWithOperator) {
          if (result == "0") {
            setHistory(history.replace(/\D$/, toAdd));
          } else {
            setHistory(history + result + toAdd);
          }
        }
      } else {
        setHistory(result + toAdd);
      }
    } else {
      setHistory(result + toAdd);
      clicked = false;
    }
    setResult(0);
  });
});

//init
clearAll();

document.querySelector("#ac").addEventListener("click", clearAll);
document.querySelector("#ce").addEventListener("click", backSpace);
document.querySelector("#eq").addEventListener("click", evaluate);
