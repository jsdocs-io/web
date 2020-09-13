import { PackageAnalyzer } from '@jsdocs-io/package-analyzer';
import { registry } from './registry';

export const packageAnalyzer = new PackageAnalyzer({ registry });
