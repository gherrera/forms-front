import { relatedDocs } from '../config/docsConst';
const revisionSections = (documentType) =>{
  let sections=[]
  Object.entries(relatedDocs).map(([revisionSection,documents]) =>{
    if (documents.indexOf(documentType) > -1){
      sections.push(revisionSection)
    }
  })
  return sections
}

export default revisionSections;