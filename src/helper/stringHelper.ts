export const getShortAddress = (address: string) => {
    if(address.length>8)
      return address.slice(0, 4) + '...' + address.slice(-4);
    else
      return address;
  };
export const compareStrings = (str1 : string, str2 : string) => {
    if(str1.toLowerCase() == str2.toLowerCase())
        return true;
    else
        return false;
}