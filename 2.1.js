        let toMystiqueAlphabet = true;

        const normalAlphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        const mystiqueUpper = 'Խ™©®§¶Վ†‡‰ᵺՀԹ¤¦¨ª«¬¯°±´µ¹²³';
        const mystiqueLower = 'ꞓ⟆℗℠٪̇ᴠ‼‽‱ᶨʜϯ₪̸҂º«⸮﹉⟁ꞇⱤ₄₅₆';

        const specialChars = ['?', '!', '¿', '¡'];

        function translate() {
            const inputText = document.getElementById('inputText').value;
            const outputText = document.getElementById('outputText');

            let translatedText = '';
            let specialCharPositions = [];
            let normalCharPositions = [];

            for (let i = 0; i < inputText.length; i++) {
                if (specialChars.includes(inputText[i])) {
                    specialCharPositions.push({ char: inputText[i], position: i });
                } else if (/[0-9]/.test(inputText[i])) {
                    normalCharPositions.push({ char: inputText[i], position: i });
                } else {
                    translatedText += inputText[i];
                }
            }

            let translatedNormalText = '';
            for (let i = 0; i < translatedText.length; i++) {
                let char = translatedText[i];
                let isLowerCase = char === char.toLowerCase();
                let upperChar = char.toUpperCase();
                let index;

                if (toMystiqueAlphabet) {
                    index = normalAlphabet.indexOf(upperChar);
                    if (index !== -1) {
                        translatedNormalText += isLowerCase ? mystiqueLower[index] : mystiqueUpper[index];
                    } else {
                        translatedNormalText += char;
                    }
                } else {
                    index = mystiqueUpper.indexOf(char);
                    if (index === -1) index = mystiqueLower.indexOf(char);

                    if (index !== -1) {
                        let translatedChar = normalAlphabet[index];
                        translatedNormalText += (mystiqueLower.indexOf(char) !== -1)
                            ? translatedChar.toLowerCase()
                            : translatedChar;
                    } else {
                        translatedNormalText += char;
                    }
                }
            }

            for (let i = 0; i < specialCharPositions.length; i++) {
                let pos = specialCharPositions[i].position;
                let char = specialCharPositions[specialCharPositions.length - 1 - i].char;
                translatedNormalText = translatedNormalText.slice(0, pos) + char + translatedNormalText.slice(pos);
            }

            for (let i = 0; i < normalCharPositions.length; i++) {
                let pos = normalCharPositions[i].position;
                let char = normalCharPositions[i].char;
                let numChar = parseInt(char, 10);

                if (toMystiqueAlphabet) {
                    numChar = (numChar + 2) % 10;
                } else {
                    numChar = (numChar - 2 + 10) % 10;
                }

                translatedNormalText = translatedNormalText.slice(0, pos) + numChar.toString() + translatedNormalText.slice(pos);
            }

            outputText.textContent = translatedNormalText;
        }

        function translateToMystique() {
            if (document.getElementById('inputText').value.trim() !== '') {
                toMystiqueAlphabet = true;
                translate();
            }
        }

        function translateToNormal() {
            if (document.getElementById('inputText').value.trim() !== '') {
                toMystiqueAlphabet = false;
                translate();
            }
        }

        function copyText() {
            const outputText = document.getElementById('outputText');
            if (outputText.textContent.trim() !== '') {
                const textArea = document.createElement('textarea');
                textArea.textContent = outputText.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                document.getElementById('Copy').style = "display: content;";
                setTimeout(function () {
                    document.getElementById('Copy').style = "display: none;";
                }, 2500);
            }
        }

        function clearText() {
            document.getElementById('inputText').value = '';
            document.getElementById('outputText').textContent = '';
            toggleButtons();
        }

        function toggleButtons() {
            const inputText = document.getElementById('inputText').value.trim();
            document.getElementById('translateToMystiqueBtn').disabled = inputText === '';
            document.getElementById('translateToNormalBtn').disabled = inputText === '';
            document.getElementById('copyOutputBtn').disabled = inputText === '';
        }

        window.onload = toggleButtons;