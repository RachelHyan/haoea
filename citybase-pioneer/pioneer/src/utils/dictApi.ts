import { mesDictQueryPublicDictData } from '@/api/mes/dictController'

export const fetchDictList = async (dictType:string,list:any ) => {
  try {
    const {data,} = await mesDictQueryPublicDictData({dictType,})
    Object.keys(data).forEach((key) => {
      Object.keys(data[key]).forEach((value) => {
        list.push({
          value: !isNaN(Number(value))?parseInt(value):value,
          label: data[key][value],
        })
      })
    })
  }catch(error){}
}
