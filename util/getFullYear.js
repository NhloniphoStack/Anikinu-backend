
export function getFullYear(){
    const dateData = new Date()

    let year = dateData.getFullYear()

    year = parseInt(year)

    return year
}