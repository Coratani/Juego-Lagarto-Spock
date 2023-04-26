export function getBarColor(value) {
    if(value > 80){
        return 'green';
    }else if (value > 20){
        return 'yellow';
    }else {
        return 'red';
    }
}

