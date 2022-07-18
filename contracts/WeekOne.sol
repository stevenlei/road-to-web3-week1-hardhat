// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WeekOne is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _tokenURISource;
    uint256 private _maxTokensPerAccount = 5;

    constructor() ERC721("WeekOne", "WKONE") {}

    function mint() public returns (uint256) {
        require(
            balanceOf(msg.sender) < _maxTokensPerAccount,
            "exceeded max tokens per account"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURISource);

        return newItemId;
    }

    function setTokenURISource(string calldata tokenURISource_)
        external
        onlyOwner
    {
        _tokenURISource = tokenURISource_;
    }

    function tokenURISource() public view returns (string memory) {
        return _tokenURISource;
    }

    function setMaxTokensPerAccount(uint256 maxTokensPerAccount_)
        external
        onlyOwner
    {
        _maxTokensPerAccount = maxTokensPerAccount_;
    }

    function maxTokensPerAccount() public view returns (uint256) {
        return _maxTokensPerAccount;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
