function validateInputs(inputs) {
    for (let input of inputs) {
        if (input.value < 0 || isNaN(input.value)) {
            return false;
        }
    }
    return true;
}

function calculateSalary() {
    const workingDays = document.getElementById('working-days');
    const absentDays = document.getElementById('absent-days');
    const restDays = document.getElementById('rest-days');
    const doubleDays = document.getElementById('double-days');
    const isSubstitute = document.getElementById('substitute').checked;
    const isMonth31 = document.getElementById('month-31').checked;

    const inputs = [workingDays, absentDays, restDays, doubleDays];

    if (!validateInputs(inputs)) {
        document.getElementById('result').innerText = 'Por favor, ingrese valores válidos.';
        return;
    }

    const dailyBaseSalary = 12.1666666667;
    const afpRate = 0.0725;
    const isssRate = 0.03;
    const viaticosRate = 6.00;
    const substituteBonus = 5.00;
    const month31Bonus = 6.00;

    const netWorkingDays = workingDays.value - absentDays.value - restDays.value;
    const baseSalary = dailyBaseSalary * workingDays.value;
    const doubleDaysPay = doubleDays.value * dailyBaseSalary;
    const viaticos = netWorkingDays * viaticosRate;

    const grossSalary = baseSalary + doubleDaysPay;
    const afpDeduction = grossSalary * afpRate;
    const isssDeduction = grossSalary * isssRate;

    let netSalary = grossSalary - afpDeduction - isssDeduction + viaticos;

    if (isSubstitute) {
        netSalary += substituteBonus;
    }

    if (isMonth31) {
        netSalary += month31Bonus;
    }

    document.getElementById('result').innerText = `
        Sueldo Base: $${baseSalary.toFixed(2)}
        \nPago por Días Dobles: $${doubleDaysPay.toFixed(2)}
        \nViáticos: $${viaticos.toFixed(2)}
        \nDescuento AFP: $${afpDeduction.toFixed(2)}
        \nDescuento ISSS: $${isssDeduction.toFixed(2)}
        \n${isSubstitute ? 'Bonificación Suplente: $' + substituteBonus.toFixed(2) + '\n' : ''}
        \n${isMonth31 ? 'Bonificación Mes 31 días: $' + month31Bonus.toFixed(2) + '\n' : ''}
        Sueldo Neto: $${netSalary.toFixed(2)}
    `;
}
