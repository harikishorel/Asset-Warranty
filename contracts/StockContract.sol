// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract StockContract {
    uint256 public _counter;

struct Product {
    string name; //0
    string model; //1
    string dealer; //2
    string serialNumber; //3
    string warranty; //4
    bool sold; //5
    string customerName; //6
    string customerEmail; //7
    string salesDate; //8
     // new state variable to store warranty information
}


    Product[] public products;
mapping(uint256 => Product) public productDetails;
    mapping(string => uint) public serialNumberToIndex;
    mapping(string => string) public serialNumberToCustomer; // new mapping to store customer names by serial number
    
constructor(){
    _counter = 1;
}

function showProduct(string memory _name, string memory _model, string memory _dealer, string memory _serialNumber, string memory _warranty, bool _sold, string memory _customername, string memory _customeremail,string memory _salesdate) public {
    productDetails[_counter] = Product(
        _name,
        _model,
        _dealer,
        _serialNumber,
          _warranty,
        _sold,
        _customername,
        _customeremail,
        _salesdate
      
    );
    _counter = _counter + 1;
}

function getProducts() public view returns (Product[] memory) {
    return products;
}


    function addProduct(string memory name, string memory model, string memory dealer, string memory serialNumber,string memory warranty) public {
        require(serialNumberToIndex[serialNumber] == 0, "Product with this serial number already exists.");
        Product memory newProduct = Product(name, model, dealer, serialNumber,warranty,false, "","","0"); 
        products.push(newProduct);
        serialNumberToIndex[serialNumber] = products.length;
    }

    function updateCustomerDetails(string memory serialNumber, string memory customerName, string memory customerEmail) public {
    uint index = serialNumberToIndex[serialNumber];
    require(index != 0, "Product with this serial number does not exist.");
    Product storage product = products[index - 1];
    require(product.sold == true, "Product is not yet sold.");
    product.customerName = customerName;
    product.customerEmail = customerEmail;
}

    
    function getProductBySerialNumber(string memory serialNumber) public view returns (string memory, string memory, string memory, string memory, bool, string memory) {
        uint index = serialNumberToIndex[serialNumber];
        require(index != 0, "Product with this serial number does not exist.");
        Product memory product = products[index - 1];
        return (product.name, product.model, product.dealer, product.serialNumber, product.sold, product.customerName);
    }

    function getProductsByDealer(string memory dealer) public view returns (Product[] memory) {
    Product[] memory dealerProducts = new Product[](products.length);
    uint count = 0;
    for (uint i = 0; i < products.length; i++) {
        if (keccak256(bytes(products[i].dealer)) == keccak256(bytes(dealer))) {
            dealerProducts[count] = products[i];
            count++;
        }
    }
    Product[] memory result = new Product[](count);
    for (uint i = 0; i < count; i++) {
        result[i] = dealerProducts[i];
    }
    return result;
}

    
function markProductAsSold(
    string memory serialNumber,
    string memory customerName,
    string memory customerEmail,
    string memory salesDate,
    string memory warranty
) public {
    uint index = serialNumberToIndex[serialNumber];
    require(index != 0, "Product with this serial number does not exist.");
    Product storage product = products[index - 1];
    require(product.sold == false, "Product is already sold.");
    product.sold = true;
    product.customerName = customerName;
    product.customerEmail = customerEmail;
    product.salesDate = salesDate;
    product.warranty = warranty;
    serialNumberToCustomer[serialNumber] = customerName;
}

}