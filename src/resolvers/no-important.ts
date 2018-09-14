import BaseResolver from './base-resolver';
import { TreeNode } from './typings';

export default class NoImportant extends BaseResolver {
  public fix() {
    this.ast.traverseByType(
      'important',
      (_: any, impIndex: number, impParent: TreeNode) =>
        impParent.removeChild(impIndex),
    );
    return this.ast;
  }
}
