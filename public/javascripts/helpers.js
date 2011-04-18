if(!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
}

if(!Array.prototype.first) {
    Array.prototype.first = function() {
        return this[0];
    }
}
