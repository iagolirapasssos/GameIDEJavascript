function createPropertyInput(prop, object) {
    const wrapper = document.createElement('div');
    wrapper.className = 'property-input';

    const label = document.createElement('label');
    label.textContent = prop.name;
    wrapper.appendChild(label);

    const input = document.createElement('input');
    input.type = prop.type;
    input.value = prop.value;

    input.addEventListener('input', () => updateObjectProperty(object, prop, input.value));

    if (prop.unit) {
        const unitSpan = document.createElement('span');
        unitSpan.textContent = prop.unit;
        wrapper.appendChild(unitSpan);
    }

    wrapper.appendChild(input);
    return wrapper;
}

function updateObjectProperty(object, prop, value) {
    switch (prop.name) {
        case 'ID':
            object.id = value;
            break;
        case 'X Position':
            object.style.left = `${value}px`;
            break;
        case 'Y Position':
            object.style.top = `${value}px`;
            break;
        case 'Z Position':
            object.style.zIndex = value;
            object.dataset.zIndex = value;
            break;
        case 'Width':
            object.style.width = `${value}px`;
            break;
        case 'Height':
            object.style.height = `${value}px`;
            break;
        case 'Background Color':
        case 'Line Color':
            object.style.backgroundColor = value;
            break;
        case 'Text Content':
            object.textContent = value;
            break;
        case 'Font Size':
            object.style.fontSize = `${value}px`;
            break;
        case 'Text Color':
            object.style.color = value;
            break;
        case 'Image URL':
            object.style.backgroundImage = `url("${value}")`;
            break;
        case 'Line Thickness':
            object.style.height = `${value}px`;
            break;
    }
}

function updateObjectProperties(object) {
    const propertiesPanel = document.getElementById('objectProperties');
    const inputs = propertiesPanel.querySelectorAll('input');
    inputs.forEach(input => {
        const prop = { name: input.previousElementSibling.textContent };
        updateObjectProperty(object, prop, input.value);
    });
}
