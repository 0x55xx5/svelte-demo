<script>
  let num1 = '';
  let num2 = '';
  let operator = '';
  let result = '';

  let display = '';

  const updateDisplay = () => {
    display = `${num1} ${operator} ${num2} ${result}`;
  };

  // @ts-ignore
  const handleNumberClick = (event) => {
    const target = event.target;
    const number = target.innerText;

    if (!operator) {
      num1 += number;
    } else {
      num2 += number;
    }

    updateDisplay();
  };

  // @ts-ignore
  const handleOperatorClick = (event) => {
    const target = event.target;
    operator = target.innerText;

    updateDisplay();
  };

  const handleEqualClick = async () => {
    // Make a POST request to the server to perform the calculation
    const response = await fetch('api/cal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ num1, num2, operator })
    });

    const data = await response.json();

    if (data.success) {
      result = data.result;
      num1 = '';
      num2 = '';
      operator = '';
    }

    updateDisplay();
  };

  const handleClearClick = () => {
    num1 = '';
    num2 = '';
    operator = '';
    result = '';

    updateDisplay();
  };

  const handleBackspaceClick = () => {
    if (num2 !== '') {
      num2 = num2.slice(0, -1);
    } else if (operator !== '') {
      operator = '';
    } else if (num1 !== '') {
      num1 = num1.slice(0, -1);
    }

    updateDisplay();
  };
</script>

<main>
    <div class="calculator">
      <!--Display-->
      <input type="text" bind:value={display} readonly/>
      <div class="buttons">
        <!--Operators-->
        <div class="operation">
          <button class="operator" on:click={handleOperatorClick}>+</button>
          <button class="operator" on:click={handleOperatorClick}>-</button>
          <button class="operator" on:click={handleOperatorClick}>*</button>
          <button class="operator" on:click={handleOperatorClick}>/</button>
        </div>
        <!--Number buttons/numpad-->
        <div class="numbers">
          <div>
            <button on:click={handleNumberClick}>1</button>
            <button on:click={handleNumberClick}>2</button>
            <button on:click={handleNumberClick}>3</button>
          </div>
          <div>
            <button on:click={handleNumberClick}>4</button>
            <button on:click={handleNumberClick}>5</button>
            <button on:click={handleNumberClick}>6</button>
          </div>
          <div>
            <button on:click={handleNumberClick}>7</button>
            <button on:click={handleNumberClick}>8</button>
            <button on:click={handleNumberClick}>9</button>
          </div>
          <div>
            <button on:click={handleNumberClick}>.</button>
            <button on:click={handleNumberClick}>0</button>
            <!--For Clear-->
            <button class="clear" on:click={handleClearClick}>C</button>
          </div>
        </div>
        <!--Equal sign and delete-->
        <div class="equal">
          <button class="backspace" on:click={handleBackspaceClick}>DEL</button>
          <button class="equals" on:click={handleEqualClick}>=</button>
        </div>
      </div>
    </div>
  </main>

  <style>
        @import './app.css';
  </style>