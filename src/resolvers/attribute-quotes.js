import BaseResolver from './base-resolver';

export default class AttributeQuotes extends BaseResolver {

  constructor () {
    super(...arguments);
    this._quotePattern = /("|')((?:\\.|[^"\\])*)("|')/;
  }

  fix () {
    this.traverse(item => {
      if (this.shouldRemoveQuotes(item)) {
        item.content[0].content = item.content[0].content.replace(this.quotePattern, '$2');
      } else if (this.shouldAddQuotes(item)) {
        item.content[0].content = item.content[0].content.replace(/(.*)/, '"$1"');
      }
    });
    return this.ast;
  }

  shouldRemoveQuotes (item) {
    return item.content[0].is('string') && !this.parser.options.include;
  }

  shouldAddQuotes (item) {
    return item.content[0].is('ident') && this.parser.options.include;
  }

  traverse (callback) {
    this.ast.traverseByType('attributeValue', callback);
  }

  get quotePattern () {
    return this._quotePattern;
  }
}
