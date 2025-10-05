 const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const programme = document.getElementById("programme");
        const year = document.getElementById("Year");
        const interests = document.getElementById("interests");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const passportPhoto = document.getElementById("passportPhoto");
        const form = document.getElementById("loginForm");
        const cardsContainer = document.getElementById("cardsContainer");
        const tableBody = document.querySelector("#summaryTable tbody");

        let students = [];
        let studentIdCounter = 0;

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validation
            if(password.value.length < 8){
                alert("Password must be at least 8 characters long.");
                return;
            }
            if(password.value.length > 20){
                alert("Password must be less than 20 characters long.");
                return;
            }
            
            if(!firstName.value.match(/^[A-Za-z]+$/) || !lastName.value.match(/^[A-Za-z]+$/)){
                alert("First name and last name must only contain letters.");
                return;
            }
            if(username.value.trim().length < 3){
                alert("Username must be at least 3 characters long.");
                return;
            }

            // Create student object
            const student = {
                id: studentIdCounter++,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                programme: programme.value,
                year: year.value,
                interests: interests.value,
                photo: null
            };

            // Handle photo
            if(passportPhoto.files && passportPhoto.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    student.photo = e.target.result;
                    addStudent(student);
                };
                reader.readAsDataURL(passportPhoto.files[0]);
            } else {
                student.photo = "https://placehold.co/120x120/667eea/ffffff?text=" + student.firstName[0] + student.lastName[0];
                addStudent(student);
            }

            alert("Registration successful!");
            clearForm();
        });

        function addStudent(student) {
            students.push(student);
            createProfileCard(student);
            addTableRow(student);
        }

        function createProfileCard(student) {
            const card = document.createElement('div');
            card.className = 'profile-card';
            card.dataset.studentId = student.id;
            
            card.innerHTML = `
                <img src="${student.photo}" alt="${student.firstName} ${student.lastName}">
                <h3>${student.firstName} ${student.lastName}</h3>
                <div class="info"><strong>Email:</strong> ${student.email}</div>
                <div class="info"><strong>Programme:</strong> ${student.programme}</div>
                <div class="info">
                    <span class="badge">Year ${student.year}</span>
                </div>
                <div class="info"><strong>Interests:</strong> ${student.interests}</div>
                <button class="remove-btn" onclick="removeStudent(${student.id})">Remove</button>
            `;
            
            cardsContainer.prepend(card);
        }

        function addTableRow(student) {
            const row = document.createElement('tr');
            row.dataset.studentId = student.id;
            
            row.innerHTML = `
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.programme}</td>
                <td>${student.year}</td>
                <td>${student.interests}</td>
                <td><button class="table-remove-btn" onclick="removeStudent(${student.id})">Remove</button></td>
            `;
            
            tableBody.prepend(row);
        }

        function removeStudent(id) {
            // Remove from array
            students = students.filter(s => s.id !== id);
            
            // Remove card
            const card = document.querySelector(`.profile-card[data-student-id="${id}"]`);
            if(card) {
                card.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => card.remove(), 300);
            }
            
            // Remove table row
            const row = document.querySelector(`#summaryTable tbody tr[data-student-id="${id}"]`);
            if(row) {
                row.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => row.remove(), 300);
            }
        }

        function clearForm() {
            form.reset();
        }

        // Add fadeOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.9); }
            }
        `;
        document.head.appendChild(style);