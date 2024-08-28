document.addEventListener('DOMContentLoaded', () => {
    let selectedObject = null;
    let offsetX, offsetY;
    let simulationRunning = false; // Variável para controle da simulação
    

    document.querySelectorAll('.draggable').forEach(button => {
        button.addEventListener('click', addToWorkspace);
    });

    const workspace = document.getElementById('workspace');

    function addToWorkspace(event) {
        const type = event.target.closest('.draggable').dataset.type;
        const object = createObject(type);
        workspace.appendChild(object);

        object.addEventListener('mousedown', startDragging);
        object.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showProperties(object);
        });
    }
    
    function startDragging(e) {
        selectedObject = e.target;
        const rect = selectedObject.getBoundingClientRect();
        offsetX = e.clientX - (rect.left + rect.width / 2);
        offsetY = e.clientY - (rect.top + rect.height / 2);

        document.addEventListener('mousemove', dragObject);
        document.addEventListener('mouseup', stopDragging);
    }
    
    
    function dragObject(e) {
        if (selectedObject) {
            const x = e.clientX - offsetX - workspace.getBoundingClientRect().left;
            const y = e.clientY - offsetY - workspace.getBoundingClientRect().top;
            selectedObject.style.left = `${x}px`;
            selectedObject.style.top = `${y}px`;
            updateObjectProperties(selectedObject);
        }
    }
    
    function stopDragging() {
        selectedObject = null;
        document.removeEventListener('mousemove', dragObject);
        document.removeEventListener('mouseup', stopDragging);
    }

    function moveObject(e) {
        if (selectedObject) {
            selectedObject.style.left = `${e.clientX - offsetX}px`;
            selectedObject.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function createObject(type) {
        const object = document.createElement('div');
        object.classList.add('draggable');
        object.setAttribute('draggable', false);
        object.id = `obj_${Date.now()}`;
        object.dataset.type = type;
        object.dataset.zIndex = 1;

        switch (type) {
            case 'box':
                object.style.width = '100px';
                object.style.height = '100px';
                object.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                break;
            case 'circle':
                object.style.width = '100px';
                object.style.height = '100px';
                object.style.borderRadius = '50%';
                object.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                break;
            case 'line':
                object.style.width = '100px';
                object.style.height = '2px';
                object.style.backgroundColor = '#000';
                break;
            case 'rectangle':
                object.style.width = '150px';
                object.style.height = '100px';
                object.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
                break;
            case 'ellipse':
                object.style.width = '150px';
                object.style.height = '100px';
                object.style.borderRadius = '50%';
                object.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                break;
            case 'polygon':
                object.style.width = '100px';
                object.style.height = '100px';
                object.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                object.style.backgroundColor = 'rgba(255, 0, 255, 0.5)';
                break;
            case 'text':
                object.style.minWidth = '100px';
                object.style.minHeight = '30px';
                object.contentEditable = true;
                object.textContent = 'Edit me';
                object.style.color = '#000';
                break;
            case 'image':
                object.style.width = '100px';
                object.style.height = '100px';
                object.style.backgroundImage = 'url("https://via.placeholder.com/100")';
                object.style.backgroundSize = 'cover';
                break;
            case 'video':
                object.style.width = '200px';
                object.style.height = '150px';
                object.style.backgroundColor = '#000';
                object.innerHTML = '<video width="100%" height="100%" controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support the video tag.</video>';
                break;
        }

        object.style.position = 'absolute';
        object.style.cursor = 'move';
        object.style.left = '0px';
        object.style.top = '0px';
        object.style.zIndex = object.dataset.zIndex;

        return object;
    }
    // Código para minimizar painéis
    document.querySelectorAll('.minimize-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.panel');
            panel.classList.toggle('minimized');
            btn.innerHTML = panel.classList.contains('minimized') ? '<i class="fas fa-plus"></i>' : '<i class="fas fa-minus"></i>';
        });
    });

    function showProperties(object) {
        const propertiesPanel = document.getElementById('objectProperties');
        propertiesPanel.innerHTML = '';

        const idInput = createInputField('ID', object.id);
        idInput.oninput = () => object.id = idInput.value;
        propertiesPanel.appendChild(idInput);

        const widthInput = createInputField('Width', object.style.width.replace('px', '') || '');
        widthInput.oninput = () => object.style.width = widthInput.value + 'px';
        propertiesPanel.appendChild(widthInput);

        const heightInput = createInputField('Height', object.style.height.replace('px', '') || '');
        heightInput.oninput = () => object.style.height = heightInput.value + 'px';
        propertiesPanel.appendChild(heightInput);

        const colorInput = createInputField('Background Color', object.style.backgroundColor || '');
        colorInput.oninput = () => object.style.backgroundColor = colorInput.value;
        propertiesPanel.appendChild(colorInput);

        const solidInput = createDropdown('Solid/Transparent', ['Solid', 'Transparent'], object.dataset.solid || 'Solid');
        solidInput.onchange = () => object.dataset.solid = solidInput.value;
        propertiesPanel.appendChild(solidInput);
    }

    function createInputField(label, value) {
        const wrapper = document.createElement('div');
        const labelElement = document.createElement('label');
        const inputElement = document.createElement('input');
        
        labelElement.textContent = label;
        inputElement.value = value;

        wrapper.appendChild(labelElement);
        wrapper.appendChild(inputElement);

        return inputElement;
    }

    function createDropdown(label, options, selectedOption) {
        const wrapper = document.createElement('div');
        const labelElement = document.createElement('label');
        const selectElement = document.createElement('select');

        labelElement.textContent = label;

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            if (option === selectedOption) optionElement.selected = true;
            selectElement.appendChild(optionElement);
        });

        wrapper.appendChild(labelElement);
        wrapper.appendChild(selectElement);

        return selectElement;
    }

    // Configurar CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'default'
    });

    document.getElementById("runButton").addEventListener("click", function() {
        const code = editor.getValue();
        
        try {
            eval(code);
        } catch (error) {
            console.error("Erro ao executar o código:", error);
        }
    });
    
    // New functions for saving and loading IDE state
    document.getElementById("saveButton").addEventListener("click", saveIDEState);
    document.getElementById("loadButton").addEventListener("click", loadIDEState);

    function saveIDEState() {
        const objects = Array.from(workspace.children);
        const xmlDoc = document.implementation.createDocument(null, "ide-state");

        const objectsElement = xmlDoc.createElement("objects");
        objects.forEach(obj => {
            const objElement = xmlDoc.createElement("object");
            objElement.setAttribute("type", obj.dataset.type);
            objElement.setAttribute("id", obj.id);
            objElement.setAttribute("style", obj.style.cssText);
            objElement.textContent = obj.innerHTML;
            objectsElement.appendChild(objElement);
        });
        xmlDoc.documentElement.appendChild(objectsElement);

        const scriptElement = xmlDoc.createElement("script");
        scriptElement.textContent = editor.getValue();
        xmlDoc.documentElement.appendChild(scriptElement);

        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(xmlDoc);

        const blob = new Blob([xmlString], {type: "text/xml"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ide-state.xml";
        a.click();
        URL.revokeObjectURL(url);
    }

    function loadIDEState() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".xml";
        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(e.target.result, "text/xml");

                // Clear current workspace
                workspace.innerHTML = '';

                // Recreate objects
                const objects = xmlDoc.getElementsByTagName("object");
                Array.from(objects).forEach(objData => {
                    const obj = createObject(objData.getAttribute("type"));
                    obj.id = objData.getAttribute("id");
                    obj.style.cssText = objData.getAttribute("style");
                    obj.innerHTML = objData.textContent;
                    workspace.appendChild(obj);

                    obj.addEventListener('mousedown', startDragging);
                    obj.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        showProperties(obj);
                    });
                });

                // Set script
                const scriptElement = xmlDoc.getElementsByTagName("script")[0];
                if (scriptElement) {
                    editor.setValue(scriptElement.textContent);
                }

                alert('IDE state loaded successfully!');
            };
            reader.readAsText(file);
        };
        input.click();
    }
});

