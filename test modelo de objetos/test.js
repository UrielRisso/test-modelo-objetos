/*
         * ========================================
         * PREGUNTAS
         * ========================================
         */
        

        

        let puntaje = 0
        let puntajeActual = 0
        let nombreParticipante = "";
        const questions = [

            {
                question:
                    "Cuando te paras a diseñar un sistema, ¿Cómo lo ves primero?",

                options: [
                    { texto: "'El sistema va a tener estas pantallas'", puntaje: 1 },
                    { texto: "'El sistema va a seguir este camino de funcionalidad'", puntaje: 3 },
                    { texto: "'Voy a desglosar el sistema de esta manera'", puntaje: 4 },
                    { texto: "'Voy a desarrollar el sistema en/con...'", puntaje: 1 }
                ]
            },

            {
                question:
                    "¿Cómo describirías un colegio?",

                options: [
                    { texto: "Un lugar donde alumnos van a aprender", puntaje: 1 },
                    { texto: "Un lugar con alumnos profesores y aulas donde los alumnos son evaluados con una nota", puntaje: 4 },
                    { texto: "Un lugar donde los alumnos ingresan estudian, aprenden y se reciben", puntaje: 3 },
                    { texto: "Un lugar donde los alumnos estudian y consultan con profesores", puntaje: 2 }
                ]
            },

            {
                question:
                    "Si te piden describir un Auto, ¿Qué es lo primero que pensas?",

                options: [
                    { texto: "Es un vehículo, con 4 ruedas, puertas y tiene 2 o mas asientos", puntaje: 4 },
                    { texto: "Es un método de transporte común en la vida diaria", puntaje: 1 },
                    { texto: "Es un objeto que se mueve y lleva personas", puntaje: 3 },
                    { texto: "Es un método de transporte para trasladarse de un lugar a otro ", puntaje: 2 }
                ]
            },

            {
                question:
                    "Asumiendo ser un fanático de los autos, si veo un auto por la calle...",

                options: [
                    { texto: "Solo se como se ve por fuera, marca y modelo", puntaje: 3 },
                    { texto: "Conozco el tipo de motor que posee, y la velocidad que puede alcanzar", puntaje: 2 },
                    { texto: "Si veo al dueño, le pregunto datos del auto que me gustaría saber", puntaje: 4 },
                    { texto: "Intento como sea recabar la información que me interese saber", puntaje: 1 }
                ]
            },

            {
                question:
                    "Si veo a un conjunto de leones",

                options: [
                    { texto: "Busco como se le llama a un conjunto de leones", puntaje: 3 },
                    { texto: "Cuento la cantidad total de ellos", puntaje: 1 },
                    { texto: "Intento identificar quien es el líder", puntaje: 2 },
                    { texto: "Pienso a que familia de animales corresponden", puntaje: 4 }
                ]
            }

        ];


        /*
         * ========================================
         * VARIABLES
         * ========================================
         */

        let currentQuestion = 0;

        let selectedOption = null;

        const answers = [];


        /*
         * ========================================
         * ELEMENTOS HTML
         * ========================================
         */

        const questionElement =
            document.getElementById("question");

        const optionsElement =
            document.getElementById("options");

        const nextButton =
            document.getElementById("nextButton");

        const questionNumber =
            document.getElementById("questionNumber");

        const percentage =
            document.getElementById("percentage");

        const progress =
            document.getElementById("progress");

        const test =
            document.getElementById("test");

        const result =
            document.getElementById("result");

        const resultTitle =
            document.getElementById("resultTitle");

        const resultDescription =
            document.getElementById("resultDescription");

        const welcome =
            document.getElementById("welcome");

        const startButton =
            document.getElementById("startButton");

        const nombreInput =
            document.getElementById("nombre");
        /*
         * ========================================
         * MOSTRAR PREGUNTA
         * ========================================
         */
nombreInput.addEventListener(
            "input",
            () => {

                const nombre =
                    nombreInput.value.trim();

                startButton.disabled =
                    nombre.length === 0;

            }
        );

        startButton.addEventListener(
            "click",
            () => {

                const nombre =
                    nombreInput.value.trim();

                if (!nombre) {
                    return;
                }

                nombreParticipante = nombre;

                welcome.classList.add("hidden");

                test.classList.remove("hidden");

                showQuestion();

            }
        );
        function showQuestion() {
            puntaje += puntajeActual
            puntajeActual = 0
            const question =
                questions[currentQuestion];

            selectedOption = null;

            nextButton.disabled = true;


            questionElement.textContent =
                question.question;


            questionNumber.textContent =
                `Pregunta ${currentQuestion + 1} de ${questions.length}`;


            const percent =
                Math.round(
                    (currentQuestion / questions.length) * 100
                );


            percentage.textContent =
                `${percent}%`;


            progress.style.width =
                `${percent}%`;


            optionsElement.innerHTML = "";


            question.options.forEach(
                (option, index) => {

                    const button =
                        document.createElement("button");

                    button.className = "option";

                    button.textContent = option.texto;


                    button.addEventListener(
                        "click",
                        () => {
                            puntajeActual = option.puntaje
                            selectOption(
                                button,
                                index
                            );

                        }
                    );


                    optionsElement.appendChild(button);

                }
            );


            if (
                currentQuestion ===
                questions.length - 1
            ) {

                nextButton.textContent =
                    "Ver resultado";

            } else {

                nextButton.textContent =
                    "Siguiente";

            }

        }


        /*
         * ========================================
         * SELECCIONAR RESPUESTA
         * ========================================
         */

        function selectOption(
            button,
            index
        ) {

            const buttons =
                document.querySelectorAll(".option");


            buttons.forEach(
                b => b.classList.remove("selected")
            );


            button.classList.add("selected");


            selectedOption = index;

            nextButton.disabled = false;

        }


        /*
         * ========================================
         * SIGUIENTE
         * ========================================
         */

        nextButton.addEventListener(
            "click",
            () => {

                if (selectedOption === null) {
                    return;
                }


                answers[currentQuestion] =
                    selectedOption;


                currentQuestion++;


                if (
                    currentQuestion >=
                    questions.length
                ) {

                    showResult();

                } else {

                    showQuestion();

                }

            }
        );


        /*
         * ========================================
         * RESULTADO
         * ========================================
         */

        function showResult() {

            test.classList.add("hidden");

            result.classList.remove("hidden");


            // Agregar el último puntaje
            puntaje += puntajeActual;

            puntajeActual = 0;




            let titulo;
            let descripcion;


            if (puntaje > 18) {

                titulo =
                    "Pensamiento orientado a objetos";

                descripcion =
                    "Pensás totalmente orientado a objetos. " +
                    "Esto facilitará tu trayecto en esta carrera.";

            }
            else if (puntaje <= 18 && puntaje > 14) {

                titulo =
                    "Pensamiento casi orientado a objetos";

                descripcion =
                    "Tenés una fuerte capacidad para pensar " +
                    "en el mundo orientado a objetos, pero hay " +
                    "partes de este que se te complican.";

            }
            else if (puntaje <= 14 && puntaje > 10) {

                titulo =
                    "Pensamiento moderado orientado a objetos";

                descripcion =
                    "Te cuesta pensar a la hora de describir " +
                    "las cosas como objetos o clases, pero tenés " +
                    "la noción de cómo se debería pensar.";

            }
            else if (puntaje <= 10 && puntaje > 5) {

                titulo =
                    "Mundo real";

                descripcion =
                    "Te cuesta salirte de la normalidad descriptiva, " +
                    "no permitiéndote desglosar las cosas como " +
                    "objetos o clases correctamente.";

            }
            else {

                titulo =
                    "Difícil tarea por delante";

                descripcion =
                    "No te sale describir como objetos o clases " +
                    "en lo absoluto. Hay que entrenar ese pensamiento " +
                    "orientado a objetos.";

            }



            resultTitle.textContent = titulo;

            resultDescription.textContent =
                descripcion;


            // Guardar en Firestore
            guardarResultado(
                nombreParticipante,
                puntaje
            );

        }


        /*
         * ========================================
         * INICIO
         * ========================================
         */

        showQuestion();
        async function guardarResultado(nombre, puntaje) {
            try {
                // En lugar de Firebase, llamamos a nuestra función secreta de Netlify
                const response = await fetch('/.netlify/functions/guardarPuntaje', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: nombre, puntaje: puntaje })
                });

                if (response.ok) {
                    console.log("Resultado guardado en el servidor oculto");
                } else {
                    console.error("Error al guardar en el servidor");
                }

            } catch (error) {
                console.error("Error de conexión:", error);
            }
        }