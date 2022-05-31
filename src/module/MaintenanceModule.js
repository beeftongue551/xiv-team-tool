const {getAllJob, getJobById, getAllJobCategory, getJobCategoryById, getAllRecipe, getRecipeByIdInXivApi} = require("@/module/XIVApiModule");
const {addJob, addJobCategory} = require("@/module/BeefApiModule");
const {getMarketableItemIds} = require("@/module/UniversalisApiModule");
const {updateItemByMarketFlg, addRecipe} = require("@/module/BeefApi/ItemModule");

module.exports = {
  async tabelJobUpdate() {
    const allJobData = await getAllJob()
    const total = allJobData.Pagination.Results
    for (let i = 0; i < total; i++) {
      const jobData = await getJobById(allJobData.Results[i].ID)
      const addJobData = {
        id: jobData.ID,
        jobName: jobData.Name_ja,
        jobAbbreviation: jobData.Abbreviation,
        jobIcon: jobData.Icon
      }
      const result = await addJob(addJobData)
      if (result === -1) {
        console.log(result)
        console.error('登録失敗エラー')
      } else {
        console.log('JOB登録: ' + addJobData.jobAbbreviation)
      }
    }
  },

  async tableJobCategoryUpdate() {
    let allJobCategory = await getAllJobCategory()
    const pageTotal = allJobCategory.Pagination.PageTotal
    for (let i = 1; i <= pageTotal; i++) {
      allJobCategory = await getAllJobCategory(i)
      for (let j = 0; j < allJobCategory.Results.length; j++) {
        const jobCategory = await getJobCategoryById(allJobCategory.Results[j].ID)
        const addJobCategoryData = {
          id: jobCategory.ID, jobCategoryName: jobCategory.Name_ja,
          gla: jobCategory.GLA, pgl: jobCategory.PGL, mrd: jobCategory.MRD, lnc: jobCategory.LNC, arc: jobCategory.ARC,
          cnj: jobCategory.CNJ, thm: jobCategory.THM, crp: jobCategory.CRP, bsm: jobCategory.BSM, arm: jobCategory.ARM,
          gsm: jobCategory.GSM, ltw: jobCategory.LTW, wvr: jobCategory.WVR, alc: jobCategory.ALC, cul: jobCategory.CUL,
          min: jobCategory.MIN, btn: jobCategory.BTN, fsh: jobCategory.FSH, pld: jobCategory.PLD, mnk: jobCategory.MNK,
          war: jobCategory.WAR, drg: jobCategory.DRG, brd: jobCategory.BRD, whm: jobCategory.WHM, blm: jobCategory.BLM,
          acn: jobCategory.ACN, smn: jobCategory.SMN, sch: jobCategory.SCH, rog: jobCategory.ROG, nin: jobCategory.NIN,
          mch: jobCategory.MCH, drk: jobCategory.DRK, ast: jobCategory.AST, sam: jobCategory.SAM, rdm: jobCategory.RDM,
          blu: jobCategory.BLU, gnb: jobCategory.GNB, dnc: jobCategory.DNC, rpr: jobCategory.RPR, sge: jobCategory.SGE,
        }
        const result = await addJobCategory(addJobCategoryData)
        if(result !== -1) {
          console.log('登録成功')
        } else {
          console.log('登録成功')
        }
      }
    }
  },

  // async updateCompanyCraftSequence() {
  //   let allCompanyCraftSequence = await getCompanyCraftSequence()
  //   const pageTotal = allCompanyCraftSequence.Pagination.PageTotal
  //   for (let i = 0; i < pageTotal; i++) {
  //     allCompanyCraftSequence = await getCompanyCraftSequence(i)
  //     for (let j = 0; j < allCompanyCraftSequence.Results.length; j++) {
  //       const companyCraftSequence = await getCompanyCraftSequenceById(allCompanyCraftSequence.Results[j].ID)
  //       const addCompanyCraftSequence = {
  //         id: companyCraftSequence.ID, companyCraftDraft: companyCraftSequence.CompanyCraftDraft.Name_ja,
  //         CompanyCraftProcess0Id:
  //       }
  //     }
  //   }
  // }

  async updateMarketableItems() {
    const marketableIds = await getMarketableItemIds()
    for(let i = 0; i < marketableIds.length; i++) {
      const result = await updateItemByMarketFlg(marketableIds[i])
      if(result !== 1) {
        console.error('更新に失敗しました. ITEM_ID: ' + marketableIds[i] + ' を確認してください')
      }
    }
  },

  async tableRecipeUpdate(page) {
    let allRecipe = await getAllRecipe()
    const pageTotal = allRecipe.Pagination.PageTotal
    for (let i = page; i <= pageTotal; i++) {
      allRecipe = await getAllRecipe(i)
      for (let j = 0; j < allRecipe.Results.length; j++) {

        if(allRecipe.Results[j].Name === null) {
          continue
        }

        const recipe = await getRecipeByIdInXivApi(allRecipe.Results[j].ID)

        const addRecipeData = {
          id: recipe.ID,
          itemId: recipe.ItemResultTargetID,
          amountResult: recipe.AmountResult,
          job: recipe.ClassJob.Name_ja,
          jobIcon: recipe.ClassJob.Icon,
          jobLevel: 0,
          recipeBook: ''
        }

        if(recipe.RecipeLevelTable !== null) {
          addRecipeData.jobLevel = recipe.RecipeLevelTable.ClassJobLevel
        }
        if(recipe.SecretRecipeBook !== null) {
          addRecipeData.recipeBook = recipe.SecretRecipeBook.Name_ja
        }

        for (let k = 0; k < 10; k++) {
          addRecipeData['ingredient'+ k] = recipe['ItemIngredient' + k + 'TargetID']
          addRecipeData['amountIngredient' + k] = recipe['AmountIngredient' + k]
          if(recipe['ItemIngredientRecipe' + k] !== null) {
            addRecipeData['recipeIngredient' + k] = recipe['ItemIngredientRecipe' +k][0].ID
          } else  {
            addRecipeData['recipeIngredient' + k] = 0
          }
        }

        const result = await addRecipe(addRecipeData)
        if(result === -1) {
          console.error('登録失敗 RecipeID: ' + addRecipeData.id)
          console.log('処理を終了します')
          return
        }
      }
    }
  }
}