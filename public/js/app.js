const weatherForm = document.querySelector('form')
const search = document.querySelector('#test')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const type = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/getRoomsbyType?type=' + type).then((response) => {
        response.json().then((data) => {
            console.log(data)
            var k = '<tbody>'
            for(i = 0;i < data.length; i++){
                k+= '<tr>';
                k+= '<td>' + data[i].roomNumber + '</td>';
                k+= '<td>' + data[i].roomType + '</td>';
                k+= '<td>' + data[i].bedsCount + '</td>';
                k+= '</tr>';
            }
            k+='</tbody>';
            messageTwo.innerHTML = k
            messageOne.textContent =''
        })
    })
})