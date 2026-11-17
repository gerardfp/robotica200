#!/usr/bin/env node
'use strict';
const path=require('node:path');
const {publishPresencial,configuredPassword}=require('./lib/presencial');
const root=path.resolve(__dirname,'..');
const result=publishPresencial({root,dist:path.join(root,'dist'),password:configuredPassword(root)});
console.log(result.enabled?`✓ /presencial/: ${result.count} documents xifrats; PDF ${result.reusedPDFs?'reutilitzats':'generats'}.`:'✓ /presencial/: accés pendent de configurar; no es publica contingut en clar.');
