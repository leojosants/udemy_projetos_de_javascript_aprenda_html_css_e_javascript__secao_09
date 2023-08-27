/* select elements */
const cpfElement = document.querySelector('[data_cpf]');
const generateCPFbutton = document.querySelector('[data_generate_cpf]');
const copyCPFbutton = document.querySelector('[data_copy_cpf]');

/* functions */
function generateCPF() {
    let random = Math.floor(Math.random() * 999999999) + 1;
    let nStr = random.toString().padStart(9, '0');
    let verifyingDigit_1 = calculateCheckDigit(nStr, 10);
    let verifyingDigit_2 = calculateCheckDigit(nStr + verifyingDigit_1, 11);

    cpfElement.innerText = formatCPF(nStr + verifyingDigit_1 + verifyingDigit_2)
};

function calculateCheckDigit(number, weight) {
    let total = 0;

    for (let i = 0; i < number.length; i++) {
        total += parseInt(number.charAt(i)) * weight--;
    };

    let rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
};

function formatCPF(cpf) {
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(regex, '$1.$2.$3-$4');
};

function copyCPF() {
    const cpf = cpfElement.innerText;

    navigator.clipboard.writeText(cpf).then(() => {
        alert(`CPF ${cpf} copiado para a área de transferência.`);
    },
        (err) => {
            console.log('Erro ao copiar CPF.');
        }
    );
};

generateCPFbutton.addEventListener('click', generateCPF);
copyCPFbutton.addEventListener('click', copyCPF);